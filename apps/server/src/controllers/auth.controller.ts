import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { authConfig } from '../config/auth.config';
import { UserModel } from '../models/user.model';
import { RefreshTokenModel } from '../models/refresh-token.model';

const generateAccessToken = (userId: number, auto: boolean): string => {
  try{
    console.log(`userId: ${userId}, auto: ${auto}`);
    const expiresIn = auto ? authConfig.expires.auto.accessToken : authConfig.expires.normal.accessToken;
    return jwt.sign(
      { id: userId },
      authConfig.secret as string,
      { expiresIn } as jwt.SignOptions
    );
  } catch (err) {
    console.error('Generate access token error:', err);
    return null;
  }
};

const generateRefreshToken = (userId: number, auto: boolean): string => {
  try{
    const expiresIn = auto ? authConfig.expires.auto.refreshToken : authConfig.expires.normal.refreshToken;
    return jwt.sign(
      { id: userId },
      authConfig.refreshToken.secret as string,
      { expiresIn } as jwt.SignOptions
    );
  } catch (err) {
    console.error('Generate refresh token error:', err);
    return null;
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const response = await UserModel.create(user);
    const accessToken = generateAccessToken(Number(response?.id ?? user.id), false);
    const refreshToken = generateRefreshToken(Number(response?.id ?? user.id), false);
    if (!accessToken || !refreshToken) {
      return res.status(500).json({ message: '토큰 생성에 실패했습니다.' });
    }

    const refreshExpiry = new Date();
    refreshExpiry.setHours(refreshExpiry.getHours() + 1);
    await RefreshTokenModel.create(Number(response?.id ?? user.id), refreshToken, refreshExpiry);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1 * 60 * 60 * 1000,       // 1시간
    });

    res.status(200).json({
      id: response.id,
      accessToken,
    });
  } catch (err) {
    console.error('Create user error:', err);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

export const verifyResetToken = async (req: Request, res: Response) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token as string, authConfig.resetToken.secret as string);
    console.log(decoded);
    res.status(200).json({ valid: true });
  } catch (err) {
    res.status(500).json({ valid: false });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, keepLoggedIn } = req.body;

    const user = await UserModel.findByEmail(email);
    if (!user || user.delete_yn === 'Y') {
      return res.status(210).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(210).json({ message: '비밀번호가 일치하지 않습니다.' });
    }

    // Generate tokens
    const accessToken = generateAccessToken(Number(user.id), keepLoggedIn);
    const refreshToken = generateRefreshToken(Number(user.id), keepLoggedIn);
    if (!accessToken || !refreshToken) {
      return res.status(500).json({ message: '토큰 생성에 실패했습니다.' });
    }

    // Calculate refresh token expiry
    const refreshExpiry = new Date();
    if (keepLoggedIn) {
      refreshExpiry.setDate(refreshExpiry.getDate() + 14); // 14일
    } else {
      refreshExpiry.setHours(refreshExpiry.getHours() + 1); // 1시간
    }

    // Save refresh token to database
    await RefreshTokenModel.create(Number(user.id), refreshToken, refreshExpiry);

    // RefreshToken을 HttpOnly 쿠키에 저장
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: keepLoggedIn
        ? 14 * 24 * 60 * 60 * 1000 // 14일
        : 1 * 60 * 60 * 1000,       // 1시간
    });

    res.status(200).json({
      id: user.id,
      accessToken,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    console.log('refresh token', req.cookies.refreshToken)
    const refreshToken = req.cookies.refreshToken;
    const { keepLoggedIn } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token이 제공되지 않았습니다.' });
    }

    const storedToken = await RefreshTokenModel.findByToken(refreshToken);
    if (!storedToken) {
      return res.status(403).json({ message: '유효하지 않거나 만료된 refresh token입니다.' });
    }

    try {
      const decoded = jwt.verify(refreshToken, authConfig.refreshToken.secret as string) as { id: number };
      const newAccessToken = generateAccessToken(decoded.id, keepLoggedIn);
      const newRefreshToken = generateRefreshToken(decoded.id, keepLoggedIn);
      if (!newAccessToken || !newRefreshToken) {
        return res.status(500).json({ message: '토큰 생성에 실패했습니다.' });
      }

      const refreshExpiry = new Date();
      if (keepLoggedIn) {
        refreshExpiry.setDate(refreshExpiry.getDate() + 14); // 14일
      } else {
        refreshExpiry.setHours(refreshExpiry.getHours() + 1); // 1시간
      }
      await RefreshTokenModel.create(decoded.id, newRefreshToken, refreshExpiry);

      console.error('new access token:', newAccessToken);
      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: keepLoggedIn
          ? 14 * 24 * 60 * 60 * 1000 // 14일
          : 1 * 60 * 60 * 1000,       // 1시간
      });
      res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
      console.error('Invalid refresh token:', error);
      await RefreshTokenModel.deleteByToken(refreshToken);
      return res.status(403).json({ message: '유효하지 않은 refresh token입니다.' });
    }
  } catch (err) {
    console.error('Token refresh error:', err);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      await RefreshTokenModel.deleteByToken(refreshToken);
    }
    res.clearCookie('refreshToken', {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    res.status(200).json({ message: '로그아웃되었습니다.' });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

export const findAccount = async(req: Request, res: Response) => {
  try{
    const { name, phone } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ message: '이름 또는 전화번호가 제공되지 않았습니다.' });
    }
    const users = await UserModel.findByNamePhone(name, phone);
    if (users.length === 0) {
      return res.status(200).json({ result: false, message: '사용자를 찾을 수 없습니다.' });
    }
    return res.status(200).json({ result: true, users });
  } catch (error) {
    console.error('Error finding user by name and phone:', error);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
}

export const pwFind = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    console.log(email)
    if (!email) {
      return res.status(400).json({ message: '이메일이 제공되지 않았습니다.' });
    }
    const user = await UserModel.findByEmail(email);
    if (user) {
      const token = jwt.sign(
        { id: user.id },
        authConfig.resetToken.secret as string,
        { expiresIn: authConfig.resetToken.expires } as jwt.SignOptions);
      const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

      // TODO: 이메일 발송 로직 추가
      console.log('Reset link:', resetLink);
    } else {
      console.log('User not found');
    }

    res.status(200).json({ message: '비밀번호 재설정 메일이 발송되었습니다.' });
  } catch (err) {
    console.error('Password find error:', err);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};
