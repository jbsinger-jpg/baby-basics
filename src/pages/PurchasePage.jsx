// import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Heading, HStack, Input, Text, useDisclosure, VStack } from '@chakra-ui/react';
// import React, { useState } from 'react';
// import ReactImageMagnify from 'react-image-magnify';

// export default function PurchasePage() {
//     // TODO: Add in a way to do drop shipping to expand on ecommerce piece
//     const [cartIsLoading, setCartIsLoading] = useState(false);
//     const [confirmationDrawerIsOpen, setConfirmationDrawerIsOpen] = useState(false);
//     const [initialDrawerIsOpen, setInitialDrawerIsOpen] = useState(false);

//     // const handleCart = () => {
//     //     setCartIsLoading(true);
//     //     console.log("TODO: Update cart purchase in the backend via firebase");
//     //     setTimeout(() => {
//     //         setCartIsLoading(false);
//     //         setConfirmationDrawerIsOpen(true);
//     //     }, 2000);
//     // };


//     return (
//         <Box h="100vh" w="100vw" alignItems="start" justifyContent="flex-start" display="flex">
//             <VStack alignItems="start" justifyContent="flex-start" display="flex">
//                 <HStack justifyContent="space-between" display="flex" w="100vw" padding="2">
//                     <Heading as="h1">
//                         Huggies Little Snugglers Baby Diapers – (Select Size and Count)
//                     </Heading>
//                     <Text> TODO: ADD HEADER ICONS </Text>
//                 </HStack>
//                 <HStack padding="10" spacing="5">
//                     <ReactImageMagnify
//                         {...{
//                             smallImage: {
//                                 alt: 'Image',
//                                 src: "//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B09W5DN36B&Format=_SL160_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=babybuyer-20&language=en_US",
//                                 isFluidWidth: true,
//                                 width: 160,
//                                 height: 160
//                             },
//                             largeImage: {
//                                 src: "//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B09W5DN36B&Format=_SL160_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=babybuyer-20&language=en_US",
//                                 width: 800,
//                                 height: 800
//                             },
//                             shouldUsePositiveSpaceLens: true
//                         }}
//                     />
//                 </HStack>
//                 <VStack whiteSpace="pre-wrap" spacing={6} paddingLeft="10">
//                     <VStack>
//                         <Text>Features</Text>
//                         <Text>
//                             {
//                                 "* Absorbent \n" +
//                                 "* Stretch sides \n" +
//                                 "* Wetness indicator \n" +
//                                 "* Cutout (newborns)"
//                             }
//                         </Text>
//                     </VStack>
//                     <VStack>
//                         <Text>Description</Text>
//                         <Text>
//                             {
//                                 "This is a diaper that is used for babies. \n" +
//                                 "Which is kinda cool... dare I say extremely cool\n" +
//                                 "coooolllllll"
//                             }
//                         </Text>
//                     </VStack>
//                     <VStack>
//                         <Text> TODO: ADD PRICE </Text>
//                     </VStack>
//                     <HStack>
//                         <Button>Qty</Button>
//                         <Button onClick={() => setInitialDrawerIsOpen(true)}>Add to Cart</Button>
//                         <Button> Sign in to Buy</Button>
//                     </HStack>
//                 </VStack>
//             </VStack>
//             <Drawer
//                 isOpen={initialDrawerIsOpen}
//                 placement='right'
//                 onClose={() => setInitialDrawerIsOpen(false)}
//             >
//                 <DrawerOverlay />
//                 <DrawerContent>
//                     <DrawerCloseButton />
//                     <DrawerHeader>Choose Options</DrawerHeader>
//                     <DrawerBody>
//                         <Text>Ship to 7001 E Zimmerly St</Text>
//                     </DrawerBody>
//                     <DrawerFooter>
//                         <Button isLoading={cartIsLoading} variant='outline' mr={3} as="a" rel="noopener noreferrer" href="https://www.amazon.com/Infant-Outfits-Clothes-Summer-Sunflower/dp/B09W5DN36B?_encoding=UTF8&pd_rd_w=BnRlr&content-id=amzn1.sym.ed0a22d3-02a9-43b9-a7a8-2632c9eb2ad8&pf_rd_p=ed0a22d3-02a9-43b9-a7a8-2632c9eb2ad8&pf_rd_r=SE1FPZ4YKK8SJTPQ062P&pd_rd_wg=ECRrk&pd_rd_r=965dc4e6-016d-46e4-8fb2-2d02a5b510fc&linkCode=li2&tag=babybuyer-20&linkId=a09e3861be9b49837b5745ed410f66cb&language=en_US&ref_=as_li_ss_il" target="_blank" rel="noopener noreferrer">
//                             Add to Cart
//                         </Button>
//                         <Button variant='outline' mr={3} onClick={() => setInitialDrawerIsOpen(false)}>
//                             Cancel
//                         </Button>
//                         <Button colorScheme='blue'>Save</Button>
//                     </DrawerFooter>
//                 </DrawerContent>
//             </Drawer>
//             <Drawer
//                 isOpen={confirmationDrawerIsOpen}
//                 placement='right'
//                 onClose={() => setConfirmationDrawerIsOpen(false)}
//             >
//                 <DrawerOverlay />
//                 <DrawerContent>
//                     <DrawerCloseButton />
//                     <DrawerHeader>Choose Options</DrawerHeader>
//                     <DrawerBody>
//                         <Text>Ship to 7001 E Zimmerly St</Text>
//                     </DrawerBody>
//                     <DrawerFooter>
//                         <Button isLoading={cartIsLoading} variant='outline' mr={3} onClick={() => setConfirmationDrawerIsOpen(false)}>
//                             Continue Shopping
//                         </Button>
//                         <Button variant='outline' mr={3} onClick={() => console.log("go to the cart page")}>
//                             View Cart
//                         </Button>
//                     </DrawerFooter>
//                 </DrawerContent>
//             </Drawer>
//         </Box>
//     );
// }
