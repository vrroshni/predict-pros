"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from "@/components/ui/label"
import { Input } from '@/components/ui/input'
import { VideoUpload } from '@/components/VideoUpload'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { profileSchema } from '@/lib/constant'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { RatingItem, computeEvaluateValues, isVideoTranscribed } from '@/lib/openaiApis'
import { ToastAction } from './ui/toast'
import Link from 'next/link'
import { useToast } from './ui/use-toast'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'


export interface ProfileType {
    name: string;
    profile: string;
    evaluatedValues: RatingItem[];
}
interface AddProfileProps {
    setProfile: React.Dispatch<React.SetStateAction<ProfileType>>;
    setLoading: (value: boolean) => void;
    values: string[]
}

export const AddProfile = ({ setProfile, setLoading, values }: AddProfileProps) => {

    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [open, setOpen] = useState(false);
    const { toast } = useToast()
    const { user } = useUser()
    const router = useRouter()
    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: "",
            profile: ""
        },
        mode: 'onChange'
    })

    const onSubmit = async (formValues: z.infer<typeof profileSchema>) => {
        if (!uploadedFile) {
            return
        }
        const { name, profile } = formValues;
        setLoading(true);
        setOpen(false)
        try {

            if (!user?.id) {
                router.push("/")
                throw new Error("User ID is not Available");
            }

            const transcribedText = await isVideoTranscribed(uploadedFile!);

            const evaluatedValues = await computeEvaluateValues(values, transcribedText, { name, profile }, user?.id);
            setProfile({ name, profile, evaluatedValues });

        } catch (error) {

            setProfile({ name: "", profile: "", evaluatedValues: [] })
            const errorMessage = typeof error === 'string' ? error : error instanceof Error ? error.message : "An error occurred, try again.";
            toast({
                title: "Something went wrong",
                description: errorMessage,
                action: (
                    <ToastAction className='bg-black text-white' asChild altText="Try Again"><Link href={"/find-our-pro"}>Try again</Link></ToastAction>
                ),
            })


        } finally {

            setLoading(false);

        }
    }


    const isLoading = form.formState.isSubmitting;

    useEffect(() => {
        if (!open) {
            form.reset();
        }
    }, [open, form]);
    return (
        <div className='flex justify-end '>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">Add Profile & Interview</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <DialogHeader>
                                <DialogTitle>Add Profile & Interview</DialogTitle>
                                <DialogDescription>
                                    Add profile here. Click save when you&apos;re done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-12 gap-4 items-center ">
                                    <Label htmlFor="name" className="text-right col-span-3">
                                        Name
                                    </Label>
                                    <FormField name="name"
                                        render={({ field }) => (
                                            <FormItem className='col-span-9'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Full Name"
                                                        className="col-span-8"
                                                    />
                                                </FormControl>
                                                <div className='h-2'>
                                                    <FormMessage className='text-red-600 text-sm font-normal mb-1 ' />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid grid-cols-12 items-center gap-4">
                                    <Label htmlFor="profile" className="text-right col-span-3">
                                        Position
                                    </Label>
                                    <FormField name="profile"
                                        render={({ field }) => (
                                            <FormItem className='col-span-9'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder='FullStack Developer'
                                                        className="col-span-3"
                                                    />
                                                </FormControl>
                                                <div className='h-2'>
                                                    <FormMessage className="text-red-600 text-sm font-normal " />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-4 py-4">
                                    <VideoUpload uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button disabled={!form.formState.isValid || isLoading} type="submit">
                                    {isLoading ? 'Saving...' : 'Save Profile'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
