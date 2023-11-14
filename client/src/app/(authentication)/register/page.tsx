"use client"
import { Card, CardBody, Stack, Heading, Input, InputGroup, InputRightElement, Button, CardFooter } from '@chakra-ui/react'
import Link from 'next/link';
import React, { useState } from 'react'

export default function Page() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <div>
      <Card maxW='sm' bgColor="white" borderColor="teal">
        <form>
          <CardBody>
            <Stack mt='6' spacing='3'>
              <Heading className="text-center" color="dark" size='md'>Register</Heading>
              <Input borderColor="teal.600" focusBorderColor="teal.600" placeholder='Enter username' />
              <Input borderColor="teal.600" focusBorderColor="teal.600" placeholder='Enter email' />
              <InputGroup size='md' mt="1">
                <Input
                  borderColor="teal.600"
                  focusBorderColor="teal.600"
                  pr='4.5rem'
                  type={show ? 'text' : 'password'}
                  placeholder='Enter password'
                />
                <InputRightElement width='4.5rem'>
                  <Button variant="outline" h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Stack>
          </CardBody>
          <Link className="block text-xs ml-5 hover:underline" href="login">Do you have an account ?</Link>
          <CardFooter>
            <Button className="w-full" type="submit" variant="outline" colorScheme='teal'>
              Submit
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}