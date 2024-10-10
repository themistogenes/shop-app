import { useState } from "react"
import { useProductStore } from "../store/product"
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
  toastStore,
  useColorModeValue,
  useToast
} from "@chakra-ui/react"

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: ''
  })

  const toast = useToast();

  // use global state
  const { createProduct} = useProductStore();

  const handleAddProduct = async () => {
    // create product and console messages
    console.log('product to add:', newProduct);
    const {success, message} = await createProduct(newProduct);
    console.log('Success:', success);
    console.log('Message:', message);
    
    // toast messages
    if (!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        isCloseable: true
      })
    } else {
      toast({
        title: 'Success',
        description: message,
        status: 'success',
        isCloseable: true
      })
    }
    
    // clear fields
    setNewProduct({
      name: '',
      price: '',
      image: ''
    })
  }

  return (
    <Container
      maxW={"container.sm"}
    >
      <VStack
        spacing={8}
      >
        <Heading
          as={"h1"}
          size={"2xl"}
          textAlign={"center"}
          mb={8}
        >
          Create New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack
            spacing={4}
          >
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
            />
            <Button
              colorScheme={"blue"}
              onClick={handleAddProduct}
              w={"full"}
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage