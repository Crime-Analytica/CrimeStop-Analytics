import React from 'react';
import clsx from 'clsx';
import { useSpring, animated } from 'react-spring';


function NameCard({
    name = "Total Crime",
    crime = 3000,
  }) {
    // const { transactions, barPlayhead } = useSpring({
    //   transactions: transactionAmount,
    //   barPlayhead: 1,
    //   from: { transactions: 0, barPlayhead: 0 },
    // });
    return (
      <div className="w-full p-2 lg:w-1/3">
        <div className="rounded-lg bg-card flex justify-between p-3 h-32">
          <div className="">
            <div>
                <div className="text-lg font-bold text-[#e01e]">{name}</div>
            </div>
            <div className="text-lg flex item justify-center text-[#fff] ">{crime}</div>
            </div>

            </div>
            <div>
                
            <div className="flex flex-col items-end">
          </div>
        </div>
      </div>
     
    );
  }
  
export default NameCard;  