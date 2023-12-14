"use client"
import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Input, InputGroup, InputRightElement, Stack, Text, useToast } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react"

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const handleClick = () => setShow(!show);
  const toast = useToast();

  const handleLoginRequest = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(false);
    try {
      const result = await fetch("127.0.0.1:8000/api/v1/auth/login", {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email: email, password: password })
      });
      if (result.status === 200) {
        setTimeout(() => {
          setLoading(true);
          router.push("/home");
        }, 1000)
      } else {
        setLoading(true);
        toast({
          title: "Error!",
          description: "Check your email or password.",
          status: "error",
          duration: 1500,
          isClosable: true
        })
      }
    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  }
  return (
    <div>
      <Card maxW='sm' bgColor="white" borderColor="teal">
        {
          loading ?
            <form onSubmit={handleLoginRequest}>
              <CardBody>
                <Stack mt='6' spacing='3'>
                  <Heading className="text-center" color="dark" size='md'>Log in </Heading>
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
                <Link className="block text-xs mt-1 text-gray-600 hover:underline" href="reset-password">Forget the password?</Link>
              </CardBody>
              <Link className="block text-sm ml-5 hover:underline" href="register">You dont have an account ?</Link>
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