import { cn } from '@/lib/utils'

import React from 'react'
import { Boxes } from './Boxes'
import { FlipWords } from './FlipWords';
import {  valuesListHomepage } from '@/lib/data';
import Link from 'next/link';
import { Button } from './ui/button';
import AuthButtons from './AuthButtons';
const words = ["eligible", "cute", "beautiful", "modern"];

const BackgroundBoxesCore = () => {
    return (
        <div className="h-[40rem] min-h-full relative w-full overflow-hidden bg-black flex flex-col items-center justify-center rounded-lg">
            <div className="absolute inset-0 w-full h-full bg-black z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

            <Boxes />

            <div className="h-fit flex flex-col  justify-center items-center px-4 relative z-20">
                <div className="text-3xl md:text-5xl mx-auto font-semibold text-white">
                    Find
                    <FlipWords words={valuesListHomepage} /> <br />
                    team with Predict Pro
                </div>
                <AuthButtons />
            </div>
        </div>
    )
}



export const BackgroundBoxes = React.memo(BackgroundBoxesCore);
