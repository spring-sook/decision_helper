'use client';
import { formatDate } from "../dateutils";
import { Spinner } from "../spinner";
import { ChatMessage } from "../types/chat";
import { format } from 'date-fns/format';


export interface MessageBubbleProps {
  message: ChatMessage;
  userType: 'customer' | 'agent';
  isTranslateOn?: boolean;
}

export const MessageBubble = ({ message, userType, isTranslateOn }: MessageBubbleProps) => {
  const { text, createdAt, direction, sendStatus, messageType, translatedText } = message;

  const isOpposite = userType === 'customer' ? (direction === 'A' || direction === 'B') : direction === 'C';

  return (
    <div
      className={`flex ${isOpposite ? 'justify-start' : 'justify-end'} gap-2`}
    >
      {/* 상대방 메시지 */}
      {isOpposite ? (
        <div className="flex flex-col items-start gap-2 max-w-[70%]">
          <div className="flex items-center gap-[2px]">
            <div className="bg-grayscale-010 rounded-lg px-4 py-2">
              <p className="font-b3 text-text-01 whitespace-pre-wrap wrap-break-word">
                {messageType === 'T' ? text : messageType === 'S' ? '(스티커)' : '이미지'}
              </p>
              {isTranslateOn && translatedText && (
                <>
                  <div className="border-t border-line-04 my-1"></div>
                  <p className="font-b3 text-primary whitespace-pre-wrap wrap-break-word">
                    {translatedText}
                  </p>
                </>
              )}
            </div>
            {/* {sendStatus === 'F' && <p>❗</p>} */}
          </div>
          <div className="flex flex-col items-start shrink-0">
            <div className="flex items-center">
              <span className="font-s3 text-text-03">{formatDate(new Date(createdAt))}</span>
              {sendStatus === 'F' && <p className="font-c2">❗</p>}
            </div>
          </div>
        </div>
      ) : (
        /* 나의 메시지 */
        <div className="flex flex-col items-end gap-2 max-w-[70%]">
          <div className="flex items-center gap-[2px]">
            <div className="bg-primary-050 rounded-lg px-4 py-2">
              <p className="font-b3 text-white whitespace-pre-wrap wrap-break-word">
                {text}
              </p>
              {isTranslateOn && translatedText && (
                <>
                  <div className="border-t border-line-04 my-1"></div>
                  <p className="font-b3 text-white whitespace-pre-wrap wrap-break-word">
                    {translatedText}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end shrink-0">
            <div className="flex items-center">
              {sendStatus === 'F' && <p className="font-c2">❗</p>}
              {sendStatus === 'P' && <div className="mr-[4px]"><Spinner width="12px" height="12px"/></div>}
              <span className="font-s3 text-text-03">{formatDate(new Date(createdAt))}</span>
              {message.senderName && (
                <span className="font-s3 ml-1 font-medium text-primary-050">
                  {message.senderName}
                </span>
              )}
            </div>
            {/* {sendStatus !== 'D' && (
              <span className="font-s3 text-primary-050">읽지 않음</span>
            )} */}
          </div>          
        </div>
      )}
    </div>
  );
};
