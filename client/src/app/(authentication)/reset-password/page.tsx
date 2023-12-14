import { Button, Card, CardBody, CardFooter, Heading, Input, Stack } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useState } from 'react'

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  return (
    <div>
      <Card width="64" bgColor="white" borderColor="teal">
        <form>
          <CardBody>
            <Stack mt='6' spacing='3'>
              <Heading className="text-center" color="dark" size='md'>Reset password</Heading>
              <Input onChange={(e)=>setEmail(e.target.value)} borderColor="teal.600" focusBorderColor="teal.600" placeholder='Enter email' />
            </Stack>
          </CardBody>
          <Link className="block text-xs ml-5 hover:underline" href="login">Back to login</Link>
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