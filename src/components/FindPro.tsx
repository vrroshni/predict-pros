"use client"
import * as z from 'zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { corevalueSchema } from '@/lib/constant'
import { zodResolver } from '@hookform/resolvers/zod'


import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { valuesList } from '@/lib/data'
import ValuesPreview from '@/components/ValuesPreview'
import ValidationMessage from '@/components/ValidationMessage'
import { AddProfile, ProfileType } from './AddProfile'

import { isValidWord } from '@/lib/helpers'
import { Rating } from '@/components/Rating'
import { Empty } from './Empty'
import { Loader } from './Loader'




export const FindPro = () => {

    const [values, setValues] = useState(valuesList)
    const [profile, setProfile] = useState<ProfileType>({ name: "", profile: "", evaluatedValues: [] })
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof corevalueSchema>>({
        resolver: zodResolver(corevalueSchema),
        defaultValues: {
            coreValues: ""
        },
        mode: 'onChange'
    })

    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (formValues: z.infer<typeof corevalueSchema>) => {
        const { coreValues } = formValues;

        // Check if the entered value is a valid word
        // const isValid = await isValidWord(coreValues);
        // if (!isValid) {
        //     form.setError('coreValues', {
        //         type: 'manual',
        //         message: 'Entered value is not a meaningful word',
        //     });
        //     return;
        // }
        // console.log(values,"valluessss123")

        // setValues((prevValues) => [...prevValues, coreValues]);
        // console.log(coreValues,values,"valluessss")
        // form.reset()
        // console.log('Valid value:', coreValues);
        console.log(formValues, "formValues");

    setValues((prevValues) => [...prevValues, coreValues]);
    form.reset();


    }

    const removeValue = (value: string) => {
        setValues((prevValues) => prevValues.filter((v) => v !== value));
    };



    const handleChange = async (value: string) => {
        // debouncedIsValidWord(value);
    }

    // const debouncedIsValidWord = debounce(async (value: string) => {
    //     const isValid = await isValidWord(value);
    //     if (!isValid) {
    //         form.setError('coreValues', {
    //             type: 'manual',
    //             message: 'Entered value is not a meaningful word',
    //         });
    //         console.log("ppppppppp")
    //     } else {
    //         form.clearErrors('coreValues');
    //     }
    // }, 2000); 
    // console.log(profile, "values123")



    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className='rounded-lg border w-full py-4 lg:py-1 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'>
                    <FormField name="coreValues"
                        render={({ field }) => (
                            <FormItem className='col-span-12 lg:col-span-8 xl:col-span-9'>
                                <FormControl className='m-0 p-0'>
                                    <Input className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent' disabled={isLoading} placeholder='Enter values need to be a PRO'  {...field}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            handleChange(e.target.value);
                                        }}

                                    />
                                </FormControl>
                            </FormItem>
                        )} />

                    <Button disabled={!form.formState.isValid} type='submit' className='col-span-12 lg:col-span-4 xl:col-span-3'>
                        Customize Core Values
                    </Button>
                </form>
            </Form>
            {/* {
                loading && (
                    <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted space-y-4 mt-4'>
                        <Loader />
                    </div>
                )
            }
            {!profile.name && !loading  && (
                <>
                    <ValidationMessage form={form} fieldName="coreValues" />
                    <ValuesPreview values={values} removeValue={removeValue} />
                    {values && <AddProfile setProfile={setProfile} setLoading={setLoading} coreValues={values} />}
                    <Empty label='Start finding a Our Pro' />
                </>
            )}



            {profile.name && <Rating profile={profile} />} */}
            {loading ? (
                <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted space-y-4 mt-4'>
                    <Loader />
                </div>
            ) : (
                <>
                    {!profile.name ? (
                        <>
                            <ValidationMessage form={form} fieldName="coreValues" />
                            <ValuesPreview values={values} removeValue={removeValue} />
                            {values && <AddProfile setProfile={setProfile} setLoading={setLoading} values={values} />}
                            <Empty label='Start finding a Our Pro' />
                        </>
                    ) : (
                        <>
                            <ValuesPreview values={values} removeValue={removeValue} />
                            {values && <AddProfile setProfile={setProfile} setLoading={setLoading} values={values} />}
                            <Rating profile={profile} />
                        </>
                    )}
                </>
            )}

        </div>
    )
}


