"use client"
import { Card, CardBody, Stack, Heading, Input, InputGroup, InputRightElement, Button, CardFooter, useToast } from '@chakra-ui/react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'

export default function Page() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const router = useRouter();
  const toast = useToast();

  const handleRegisterRequest = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(false);
    try {
      const result = await fetch("http://127.0.0.1:8000/api/v1/auth/register", {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ username: username, email: email, password: password })
      });
      if (result.status === 201) {
        toast({
          status: "success",
          title: "Account created.",
          description: "You are directed to login page.",
          duration: 1500,
          isClosable: true
        })
        setTimeout(() => {
          setLoading(true);
          router.push("/auth/login");
        }, 1500)
      } else {
        setLoading(true);
        toast({
          status: "error",
          title: "Account not created.",
          description: "Something going wrong!",
          duration: 1500,
          isClosable: true
        })
      }
    } catch (error) {
      setLoading(true);
      toast({
        status: "error",
        title: "Account not created.",
        description: "Something going wrong!",
        duration: 1500,
        isClosable: true
      })
    }
  }


  return (
    <div>
      <Card maxW='sm' bgColor="white" borderColor="teal">
        {
          loading ?
            <form onSubmit={handleRegisterRequest}>
              <CardBody>
                <Stack mt='6' spacing='3'>
                  <Heading className="text-center" color="dark" size='md'>Register</Heading>
                  <Input onChange={(e) => setUsername(e.target.value)} borderColor="teal.600" focusBorderColor="teal.600" placeholder='Enter username' />
                  <Input onChange={(e) => setEmail(e.target.value)} borderColor="teal.600" focusBorderColor="teal.600" placeholder='Enter email' />
                  <InputGroup size='md' mt="1">
                    <Input
                      onChange={(e) => setPassword(e.target.value)}
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
            :
            <p className="text-xl bg-teal-600 text-white">Loading...</p>
        }
      </Card>
    </div>
  )
}