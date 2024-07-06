import React from 'react';
import { ProfileType } from './AddProfile';
import { CircleX, Sparkles } from 'lucide-react';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import Image from 'next/image';


export const Rating = ({ profile }: { profile: ProfileType }) => {
  const isSelected = profile.evaluatedValues.every(val => val.score > 5);
  return (
    <div className="flex items-center  w-full justify-center h-fit">

      <div className="w-72">
        <div className="bg-white shadow-xl rounded-lg">
          <div className="photo-wrapper p-2 relative w-full min-h-[6rem] h-36 rounded-md  bg-[#E4E6E7]">
            <Image  src={"/dummy.webp"} className='object-contain' fill alt="John Doe" />
          </div>
          <div className="p-2 flex flex-col items-center ">
            <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{profile.name}</h3>
            <div className="text-center text-gray-400 text-xs font-semibold">
              <p>{profile.profile}</p>
            </div>
            <table className="text-xs my-3 ">
              <tbody>

                {profile.evaluatedValues.map((item, index) => (
                  <tr className='flex items-center justify-between gap-2 mt-2 ' key={item.coreValue}>
                    <td className="px-2  text-gray-500 text-base ">{item.coreValue}</td>
                    <td className="px-2  font-semibold justify-end flex items-center gap-1">{item.score}/10 {item.score > 5 ? <Sparkles size={16} className='text-yellow-500 ml-1'/> : <CircleX className='text-red-600 ml-1' size={16} /> }</td>
                  </tr>
                ))}
              </tbody></table>

            <div className="text-center my-3">
            <Badge variant="outline" className={cn('px-4 py-2', isSelected ? 'bg-green-600/40' : 'bg-red-600/40')}>  {isSelected ? 'Selected' : 'Not Selected'}</Badge>
             
            </div>

          </div>
        </div>
      </div>

    </div>


  );
}
