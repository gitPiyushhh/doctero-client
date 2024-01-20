import React from 'react';
import { CiCircleQuestion } from 'react-icons/ci';
import { FaAngleRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';

function OverviewCard({
  isHighlighted,
  heading,
  value,
  hasCta,
  ctaContent,
  ctaContentType,
  highlightContentKey,
  highlightContentValue,
}) {
  const userObj =
    useSelector((state) => state.auth.user) ||
    JSON.parse(localStorage.getItem('user'));
  const isDoctor = userObj.isDoctor;

  if (!isHighlighted) {
    return (
      <div className="w-[32%] flex-col text-stone-900">
        <div className="w-full rounded-lg p-4 py-6 shadow-md">
          <span className="flex items-center space-x-2 text-[16px]">
            <span>{heading}</span>
          </span>
          <div className="mt-2 flex w-full items-center justify-between">
            <span className="text-[28px] font-semibold">{value}</span>
            <span className="flex items-center space-x-2">
              {hasCta && (
                <>
                  <span className="decoration text-[14px] text-[#146EB4] underline underline-offset-2">
                    {ctaContent} {ctaContentType}
                  </span>
                  <FaAngleRight size={16} fill="#146EB4" />{' '}
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[32%] flex-col text-stone-100">
      <div
        className={`w-full rounded-t-lg ${
          isDoctor ? 'bg-[#146EB4]' : 'bg-[#349882]'
        } p-4 py-6 shadow-md`}
      >
        <span className="flex items-center space-x-2 text-[16px]">
          <span>{heading}</span>
        </span>
        <div className="mt-2 flex w-full items-center justify-between">
          <span className="text-[28px] font-semibold">{value}</span>
          <span className="flex items-center space-x-2">
            {hasCta && (
              <>
                <span className="decoration text-[14px] text-[#146EB4] underline underline-offset-2">
                  {ctaContent} {ctaContentType}
                </span>
                <FaAngleRight size={16} fill="#146EB4" />{' '}
              </>
            )}
          </span>
        </div>
      </div>
      <div
        className={`flex w-full items-center justify-between rounded-b-lg ${
          isDoctor ? 'bg-[#0E4F82]' : 'bg-[#236758]'
        } px-4 py-2 text-sm`}
      >
        <span>{highlightContentKey}</span>
        <span>{highlightContentValue}</span>
      </div>
    </div>
  );
}

export default OverviewCard;
