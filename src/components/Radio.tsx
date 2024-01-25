/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, HStack, useRadio, useRadioGroup } from '@chakra-ui/react'

// 1. Create a component that consumes the `useRadio` hook
export function RadioCard(props: any) {
  const { getInputProps, getRadioProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getRadioProps()

  return (
    <Box as="label" width={'100%'} px={2}>
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        width={'100%'}
        height={9}
        px={4}
        py={1}
      >
        {props.children}
      </Box>
    </Box>
  )
}

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
export function Example() {
  const options = ['Mensagem', 'Automação']

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: 'Mensagem',
    onChange: console.log,
  })

  const group = getRootProps()

  return (
    <HStack {...group} display={'flex'} flexDirection={'column'} mt={8}>
      {options.map((value) => {
        const radio = getRadioProps({ value })
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        )
      })}
    </HStack>
  )
}
