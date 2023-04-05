import { Button, Card, CardBody, HStack, Heading, Icon, Image, ListItem, Select, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, UnorderedList, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import CribIcon from '@mui/icons-material/Crib';

// TODO: Order information based on the trimester
export default function MaternalResourcesPage() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, setVideos] = useState(null);

  return (
    <>
      <HStack w="100vw" h="80px" justifyContent="space-evenly" alignItems="start" paddingTop="5" marginBottom="10">
        <Button borderRadius="40%">02</Button>
        <VStack>
          <Button borderRadius="40%">04</Button>
          <Icon as={CribIcon} />
        </VStack>
        <VStack>
          <Button borderRadius="40%">08</Button>
          <Icon as={CribIcon} />
        </VStack>
        <Button borderRadius="40%">13</Button>
        <Button borderRadius="40%">16</Button>
        <Button borderRadius="40%">18</Button>
        <Button borderRadius="40%">21</Button>
        <VStack>
          <Button borderRadius="40%">24</Button>
          <Icon as={CribIcon} />
        </VStack>
        <Button borderRadius="40%">32</Button>
        <Button borderRadius="40%">33</Button>
        <Button borderRadius="40%">34</Button>
        <Button borderRadius="40%">35</Button>
        <Button borderRadius="40%">36</Button>
        <Button borderRadius="40%">37</Button>
        <Button borderRadius="40%">38</Button>
        <Button borderRadius="40%">39</Button>
      </HStack>
      <Tabs align='start' variant='enclosed'>
        <TabList>
          <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
            Baby
          </Tab>
          <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
            Mother
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <HStack w="100vw" justifyContent="space-evenly" alignItems="start">
              <VStack h="60vh" justifyContent="space-between">
                <VStack w="30vw">
                  <Heading textDecoration="underline">Health Advice</Heading>
                  <Card maxW='sm'>
                    <CardBody>
                      <Stack mt='6' spacing='3'>
                        <Image
                          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHvho0UC6aSJ46yhNYi_-nd6jijcEqQe5DHA&usqp=CAU'
                          alt='avacada'
                          borderRadius='lg'
                          h="300px"
                          w="300px"
                        />
                        <Heading size='md'> Week 16! </Heading>
                        <Text>
                          Prenatal Checkin
                          {/* **Prenatal Vitamins**
                          **Screening Tests**
                          **Questions For OBGYN** */}
                        </Text>
                        <Text> Prenatal Vitamins </Text>
                      </Stack>
                    </CardBody>
                  </Card>
                </VStack>
              </VStack>
              <VStack justifyContent="start" w="30vw" spacing="4" h="100vh">
                <Heading textDecoration="underline">Physical Changes</Heading>
                <Card maxW='sm'>
                  <CardBody>
                    <Stack mt='6' spacing='3'>
                      <Image
                        src='data:image/png;base64,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'
                        alt='avacada'
                        borderRadius='lg'
                        h="300"
                        w="300"
                      />
                      <Heading size='md'> Week 16! </Heading>
                      <Text>
                        Your baby is the size of an Avacada!
                        The weight is around 100g, which is the same as a medium bag of salad.
                        Your baby is starting to pull faces now, but any smiling or frowning will be completely random, as there's no muscle control yet.
                      </Text>
                    </Stack>
                  </CardBody>
                </Card>
              </VStack>
              <VStack justifyContent="start" w="30vw">
                <Heading textDecoration="underline">Resource Links</Heading>
                <Card maxW='sm'>
                  <CardBody>
                    <Stack mt='6' spacing='3'>
                      <Select
                        placeholder='Select Video'
                        value={selectedVideo}
                        onChange={(event) => {
                          setSelectedVideo(event.target.value);
                        }}
                      >
                        {videos && videos.length > 0 && videos.map((video) => {
                          return (<option value={video.value} key={video.key}>{video.label}</option>);
                        })}
                      </Select>
                      <iframe
                        height="300px"
                        width="100%"
                        src={selectedVideo || "https://www.youtube.com/embed/rv-fBnFbQAk"}
                        title="YouTube video player"
                        allowFullScreen
                      />
                      <Heading size='md'> Week 16! </Heading>
                      <Text>
                        Have fun baking that baby bun!
                        {/* **Prenatal Vitamins**
                          **Screening Tests**
                          **Questions For OBGYN** */}
                      </Text>
                    </Stack>
                  </CardBody>
                </Card>
              </VStack>
            </HStack>
          </TabPanel>
          <TabPanel>
            <HStack w="100vw" justifyContent="space-evenly" alignItems="start">
              <VStack h="60vh" justifyContent="space-between">
                <VStack w="30vw">
                  <Heading textDecoration="underline">Health Advice</Heading>
                  <Card maxW='sm'>
                    <CardBody>
                      <Stack mt='6' spacing='3'>
                        <Image
                          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHvho0UC6aSJ46yhNYi_-nd6jijcEqQe5DHA&usqp=CAU'
                          alt='avacada'
                          borderRadius='lg'
                          h="300px"
                          w="300px"
                        />
                        <Heading size='md'> Week 16! </Heading>
                        <Text>
                          Prenatal Checkin
                          {/* **Prenatal Vitamins**
                          **Screening Tests**
                          **Questions For OBGYN** */}
                        </Text>
                        <Text> Prenatal Vitamins </Text>
                      </Stack>
                    </CardBody>
                  </Card>
                </VStack>
              </VStack>
              <VStack justifyContent="start" w="30vw" spacing="4" h="100vh">
                <Heading textDecoration="underline">Physical Changes</Heading>
                <Card maxW='sm'>
                  <CardBody>
                    <Stack mt='6' spacing='3'>
                      <Image
                        src='data:image/png;base64,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'
                        alt='avacada'
                        borderRadius='lg'
                        h="300"
                        w="300"
                      />
                      <Heading size='md'> Week 16! </Heading>
                      <Text>
                        Increases in your blood and hormone levels might be causing you some discomfort.
                        You might develop acne as your skin produces more oil.
                        You might also notice varicose veins or get cramps in your legs.
                        Exercising and stretching should help to relieve this.
                      </Text>
                    </Stack>
                  </CardBody>
                </Card>
              </VStack>
              <VStack justifyContent="start" w="30vw">
                <Heading textDecoration="underline">Preggers Symptoms</Heading>
                <Card maxW='sm'>
                  <CardBody>
                    <Stack mt='6' spacing='3'>
                      <Image
                        src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUWFRgVFRIYGBgSGBgZGBgYGBwYGBgYGBoaGhgYGhkcIS4lHB4rIRkYJjgmKy8xNTU1HSQ7QDs0Py40NTEBDAwMEA8QHhISHjYsJCg6NDY0PjQ0NjQ2NzQ0NjQ1NDQ9NDQ1NDQ0NDQ0ND00NDY0ND80NDQ0NDQ2NDE0NDQ0NP/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAQUCBAYDBwj/xABCEAACAgECAwQHBAYJBAMAAAABAgARAxIhBDFBBSJRYQYHEzJxgZFCUmKhIzRysbPBFCRzgoOSorLCMzWj4SXR8P/EABkBAQADAQEAAAAAAAAAAAAAAAABAgMEBf/EACQRAQEAAgIBBAEFAAAAAAAAAAABAhEDMSEEEkFRcRMiMmGR/9oADAMBAAIRAxEAPwD7KTIAk1JgIiICJFyYEVJiICIkGBBMkCAJMBERATEzKIEASYiAkEwZFQEmJMBERAgyAJlEBERAREQEREBMSYJgCAAmURARExJgZRIEmAiIgRIiSBAmIiAiQTIBgZREQERIJgCYBkATKAiIgIkXJgIiICQZMQMQJlEQERMTAEyQIAkwERECJE0u0u0ceBC+RqA2A5lj0VR1P/s8hOP4z04dldUwadSsFY5O8pIIDUFIBHOrPLnM8uXHHur48eWXUd0rrdAixzF8vlM58QR9J1boymwwsEH7wcbg+exn2DsTK7cPibJ7zY1JPjY5/PnKcXL79zWluTi9mvKxkEwTIE3ZAkyYgIiIEEyBFTKAiIgJiTBMAQAEyiICIiBAkxEBESLgTIqTEBESICRE1G4xRkGKmsi7oaaN9b8v3eMrlljjN2pk2+e+mXHnJxDLfdwd1R0ugXb43t/dEoSZtekv6PicysVF5GbvGvfOsfKnEuuwuxKT+kZjSoC6KAGPc31OvlR7vPxojbzs8bnnfy78csccI57NhdGKupVgAaPOmAYfOiNum4ncer7jSyZMLEkYirLfRX1Wo8gVJ/vTme1+JTiFHEYi7hbTK7ABQQRpG2y+9y81O/OX3q6wG82T7J0Kp8WGpm+gZPqZfixuPLJOlOWzLj3XckSYieg4iIkEwEmYgTKAiIgJBkxAxAmURARExJgZRMIgZxExJgCZIEASYCIiBEiDJAgRUoOLzKvEj9ICdI7rUCgNUuPlerTZFE7DfYCdBNPj+FOQKA2nSwblYNAiqsdSD8pzeq4ry8Vxx7+FsLJfLnPTD0fxZyGZG1ZF0akPeDKQykAgj3Q4JrfYeE2eEVUVcbALj9ljRVdhXd1KVom7IKS8fhwyaGN7DcbGxRDDwIIBHmJTccpDBH75YMv6NkDOjC2DI1aVpRZB6bVdSbh86/LTHLxpW8J2ImFSFQIiuzBRbF3cBFFkk3egC50/ZWBkxgN7xLM3LmxJN1te9mtrJmjhLHMntNKrTFVuyXGnTqPImi9KL5XZ6Xkvx4/KOTLd0mIkEzVkEyAIAnhxvFLiRsjmlRST8B0HmfCB7nacr216Xric48SDIy+8S1ID4AgHUfHkB43YnH9s9sZOJYlzSX3cYPcUdLH2m/EflXKVSnTtR5kihfM30nFyepvWLrw9P85Ppvo96TLxLFGTQ4BYDVqBA2NGhuLG1deu86ImfIewu0PY50ylSVQnX0OlgVNDqRd/KvMfT+IR3ZNLaUoMWU7ne625iqrpuSeQDbcPJc8fPbLmwmOXjpYCTETdiRExJgCZIEASYCIiBi0kCTEBERARMbmUCJx6+kWUcQynQcauyaVIJBDBQQ3jZUUeRZejgr2EoeN7JRcw4hULdWVRdNvWQKPeO7bDfvEjcm6Z71uLY635bnZ/aAyu6iqTTRF2bsEEHkQVO3Sxe8sjKVM6qwyc0K6WYfY3vUfw9D4fC6uNQq7253GOW4ZTVUvpDxxRdCkhmBZiLBXGvvEEcidgPmRylV2fxPstQ0WrHV3dIYE87sgEdbu7J+Wrxmb2+Qk+64JrlaDZF8QDbMR4muUz1DlY+s09ss8vS4eDGYay7rd4vtEupVcdXsWfSR8lBOo/GvnyldgWiVQsmmqKsVNkXZrn87BnvPBPfceSH66h/wAYmGM6bTiwk1p2PZ3E+0xo5qyveA5Bhsw+TAibcqPRxv0TL9zIw/zU/wDylvIePnNZWfTR4ns9XYPZDAAWKugSQAea8z7pF3vYlD6wM5XAig+/kGrzCqzf7gsvuM9qSFx7Ajd+7sfgb+Pum+W3Oc/6wFvBjN7rkB5fZKlSfIWy/UTLl/hdLcX8ptwM9MGBnZVVSWc0o8T/ACFWSegEwwIXYIg1uxoKu5Nc/gB1J2E77sPsZeHQs3fyMO8VF0PuJ5efM/QDz8MLlf6d2eeo4jjuFfE7Y3HeStxyYHkwvof/ALHSfQuwe1E/ouIe0RsioFCF1ViV7oG52NCafbvZy501spQ4yoR6BYqSNQKWLG+wu76dG0ODwhUCg6gtrfRgCRqrz5/OdfBx2ZX6UmE5pq3WnZcLndr1Y9NVRuwbu+gIr6b8+dbc5jsDtIjSjHuvQWzehvuX90nYeB25EAdNc6nHyYXDLVZSAJMQoREQEREBERAiREkCAAmGXIFUsxoKLJM9JoIPaNqPuIe6OjMNi58QDYHnZ+6QBcTZO84IT7OM9fxP4nwXkOtmtO8TBMiBWcTw7KxdBYbd0HMn76fi8R1+PvaGdyEK4iGXOCgSyNN2HZDXdoXYOwNde63RylXGpy5HAAs6BXXTWo14lrBPUIvgJlnNeY0wu/FafD9joN377bjve6ATekKNiOW7WZujhUAoIleGla+lT3kGZW29t929tDN2XjPuroPind+q+6fmDKteAye2KllGrHevSSDobw1Aqe+dj4cz0vM/EBdubN7qX3mPT4DnZ6ATwYsgOkB82QE1yBK8rP2UW6+fUne0yynVWnJlj1Wz2BgKjIGYN+k5hdI9xOhJlxNPs5V9mpUlg4D6jzbXvddOfLoKE3JvN68uTK7ytpK7tfs1c+MoxqwaYC6vy69D8QD0lgTFRZLNVEuvMfMs/CZ+H4jFhwUdTquVl7p0906yWPe2Zm07haAre27HjGDI6hwpIZQSStNo1Dfny326SmyuMhZiARkYtvuCt9y/7oWeI4Eoqu2MkOQyEKW97dVK/ZcAhb8hv0Gf6MnV8O+8Xie66taHYXDZlx6cuUtbMWCt3G+6AQBY3JJGx7vOt7HAxo30Zx8gxA/KpY8P2YTvkYj8Kmq/aYbk/s18TzmnkxBHdQKVXFD4ojH8yZpx3GXUb8WeMvtjXwpasp6O3kdzqFHoe8J1nY/F+0Tf3lOlvNh1rpYIPlddJRdm8Gj+01LvrHeFq1aErvDfoZscGj4My2S2PNSFqoq25TXW3O1BFWXANULXOb05/U3HLc+Y6eIkSXAmJiZIgTERASCIBkwIAkxEDT41zQRSQ2Q1Y5qo3dvKhsD4lZsIgUBQAAAAANgANgBNbANWR36L3F+W7kfFiAf2BNwiQImURJESm4b7Y6jJkv5uzD8mB+cuZVcbjKOcgFo9awNypAoPXUVQPhQPjKck3F8Lqs5VcShw43IyNqyZCykrrILkdxVvlQPwsmWasCAQQQdwRuCPEGYZ8COul0Vl8GAI5V1+JnO3VfZ/GqqUyj2hs0gsux5UxJJPIWxrY70pqxwY9ALMQWNF2+HQeCjeh/Mklw/CIhJVApPMjnvz3M0+M49GzpwgOp8tlwPsY1Us2rw1VpA5965Mm0W6XfZSlcGIEUVxoCPAhRYm0TJMgCdTmAJX8VxhC5yBXsUJ3PeJ0lgQPu8gD1Ibw3sZz/G7YcrVRyZQKO7AF1UqzdftEdACALABkLYTeUimGEEKg5MUT4BiE/cZ0TNrct9nGSiDpY2Zvjdr5BT4mU/BreXGPFwf8oL/APGW3Ce75hnDftB2Df6rleW/Du9Td5yfUexlDxR/S5PJl/2JLzK4VSx5KCT12As7TnMeUPbjk7MwvnpJOn/TUrw9p9PN5bWXYo/6h/Eo+ig3/q/KWOTGGUqeTCvMeY85p9jpWO/vM7fLUQPyAmzxPELjRnc0uNSzHyUWZTK7yrLku8rVhwOUtjRjzZVJ+JG/53PczQ7EJPD4SRRbFjJ+LICfzJlgBN505L2ASYiSgiIgQBJiICYZHCgkmgoJPwG5mRM0+0xeN1++NH+chB/ugZ9nqRjXUKZhqYfibvN+ZM2oiAiJBMATIEATKBzPpef6Pw2TiMPcdSnL3W1ZEVtSHukkMd6vznGdlemvFZMuPFowk5HRNWh9tTAFiNe9A38p2PrFP/x+b44f42OfNvQZL4/hx+Nz/lxu38pW4yrTKxZek3pLxqZsuD2ioMbFbxppLKd1NsWINEciJteqvAW4jNlJJKYwCTuS2Rrsnqe431lV6wE/r+bz9mf/ABpOx9VfDaeGyPX/AFMpA/ZRVA/MtExk6Lbe3cxESyqJSekr0iXy9oNR6AaWqz0F1zl3Kzjn1ZFUfY77eVhlUfO2P93zEi3U2vx3WUv0pOxir5k0sDp1NsQdtJW9v2xLjiV9mxY+45u+iOed+CnnfjfiJ69lqLyHqXrz2Rav8z85YESL+6eWnLy3LP3KvM1KxJqgTfhQ5yhTs/IiILSzoUCmFXQO1m6FnmOUuO0eEUAIhZS9WikafZ2A2zA6RpJAC1Z+c5v047dycMcIxhdTa2JYWBQCihfPvNMpvG6lXx5bjNx02JVxoAWAXGoBZiAKUbsTyHjPnHpr6UjMDgwn9GDbvy1kcgPwA7+ZA6Deo4ntXPxGr22VnARjp2CAiqOhaF+cqCt7eO31lscNeayyz30/QvZyacWNfuog+igTalfnYh8SAmjZZRsaUbMW+6DQI5mx0BBsJpGRIJgyJIaojTEDKQTBmNQJmr2gO6v9pi/LIh/lNuanaHuj+0xfnkUfzhLciRJhCCZAEkiTAREQOX9Y/wD2/N+1h/jY5879X4/r+Dy9p/CefRPWL+oZf2sP8XHPn/q934/F5DIf/Gw/nIqYx9YTf1/MPAY/4aTvPVl+or/aZP8AdOC9YP6/m/w/4STvfVn+or/aZP8AdCHXREiSIJnOcVxTJnyCuqbHwZCAQfDUgHzM6MTS4/s1MtarGnqpokfdJ8PhuOhErlPdNLY5arX7Dys4dmUqWK2PA6RyPXaj85bQBJkyamkW7u3M8dxGRMzEhTqDUvM6Qaxb7UCQwrfvP4VOU9Pu/hTNWwyezUjqCrsSPIgJ8CCJ2vHcKmXLysqqF21ALo1saNGye623LveQr5T6W9tDiM1JQwYbXEoFLXV6HVj+QHnKTH9217l400+y8eoZz9zh3b6NjH85q8CmrIi/edB9WAnZ+iXo6zcHxXEEb58GRMS1uQBZb5sqgfA+M4zgOICZEyVqGN0errVoYNV9LqXUffmwk5AxNqFIA5FWJ3PmCD8tPW9tkmU3YPpHw/FreN6cDvY22dfl1HmLE2sfFFX0ZKBYuUawAwDjStXd0yjl0MIb0kCAJMkIiICJocVx+jJjx6Qfak7l1UrX4Tu3htN+BE1eOxkpsLKsjUOuh1av9M2pznpRx3EYwPZqAmxLj3tQJ7p6AHu/Hcc6BrnlMZupxlt1F1xfFJjALmgSFGxO58h8D9J6Y8qmwGBKmmAN0aBo1yNEGvOVfGcOcyJkRgWQbUe4SSuphYJ1LpOm+R5g8p49gBrJ9mwVl99rUkg2FCNvXec6jZO5J3oZXkynJMdeL8p1NbdBERN1SJFyYHLescf1DL+1h/jY5wnq2X+vJ5JkP5V/Od36yP8At+X9rD/Gxzh/ViL474YXP5oP5yBq+sH9fzf4f8JJ3nqy/UV/tMn75wfrC/X83+H/AAkneerT9RH9o/7xA665MgCTJCIiAnnkUkbGj0NXXynpEDgfWB2qOHwDhkbv8RqLEAAjGWJbly1ElfhqnBejvZDcVxCYVsKe87D7KD3j8eQHmRPoXpF6P4uL1cQzOjgHSyUQUQHTan3r3YEUe8B0mz6H8Dw3CqVXMHyZSNWTSVVuiKhPdI36E2SfICuNl6XuN7dVgwqiqigKqAKoHIACgB8pyXpN6C4uILZMJGLKdzt3HP4lHI/iHzBnZXIllHwLjeB4jhMoDq+J1NowNXX2kccx8PnOy7C9Ow6jDxhq6C50AuwQQXWqBsDvAV4gc53/AGlwOLMhTMiup3IbpXUHmCPET5nl9EuHGfbiHPD8ydPeG47uvqvXXR2HzkVbHHLLqPqfDOGUFX1giw1qQwPIgqKI+E95T9kqMQXCo/Rgfo630gc1Pj4g/G+QJt4l3Nos1dJiRJkoUPad/wBJwDYDmbYgk6ttKhtzz6bXvsal9KLtb/r4TtQK/UuAPsnxOxI5bbiXsCCZgy2CCLB6H90yqZQOU7X4U8OQ+HI2NMjU4AtQTVEDptew3NBQRsJZej3FPkxkudVMQr1WpQBv9bHyo2QTLcwJjOLWW5fH0vc946s8/bKYkwTAE2UAJhmyKqlmICqCSSaAAFkk9BPWIHF9sekCZR7NcQyYiQWL7atJDAKpB7pIFk786HIj19EMaHJkyJw+LEqqqD2ajmSWcF6F8k2oVtOifsvATbYMZPicak/WpsKgUUAAByAFAfASNTe2+XJx+z2446v3a470hOEcU3teFx5A2LGbKrrsNkHUbjpz6Dn0u/RUD+jqVxqgLOdKCl99ht47Abze4vs/Fkr2mNW03WoXV86PyH0mxjxhQFUABQAABQAHIADkI1Jdq5Z43CSTz8vWIiSyUHHekAxZxhKWpClnDElb1XaBTypTz5Nfxw4z0kx6W9kS7Da9J0rvRZro0OZ+HSWr8DiZizYkZjVsVUnbYbkeQmyFFVUyuOd35n+Ly4+PCg7A7Ryu7I7axoDatOkqTp7p7q87bp9k79Bn2r2yyMyHEAtVrdyl2Ps90g8/H5S5w8OqClRVBNkKABfjtPWpbDGyat2e7H3b14cbk4t3QIVQLQDMjHvKB7oWtgdr3O1jrMHAIIIsEbg8q851OXs3Cxs4UJPXSA3+YbzFeysA39ihPmA1fC7qXmseo6sfVY4zxi8uwXZsI1EmiQrHfUoPdN9fC+tX1lmIAkw48ru2qf0iVjiAAJXUNYAvugE7gb1q035Xe1ygTIG3Vgfgb/dO3M18vCY2NtjRj4soP7xJl06OH1H6c1rbkeF4x8TUuRNgQqspYqpIJVQHF7jw5ADpLrsztDO7gNj7pu20Nj07GveJ1WaFDxuW2LCq7KqqPAAD909ZGp8KcnLjn1jpMmIhipu0siDPhsr7TfQCzhu9s2y7Ebfa8DLmUPa2X9Pw6fis/AsoF+IsfAHT5A30BERASDJiBiBMoiAiJiTAyiRJgIiICYzKRUABJiICJBMAwEASYgIiIEEyAJNSYCIiAiRcQKftXOwzcOoLBWc6iGAB5DSRzPT6112uZU8fwbtmwuAKQ946iGrf7PKrrfnRI+NtATEmCYAgSJMRARExJgCZIEASYCIiBEAyJIECYiICQYJkQImQESYCIkEwFyZiBMoCIiAmJMkmQBAiomcQEiTEDETKIgIiIEGYr/8AvziIGcREBIMRAhZlEQEREDEyREQJiIgJiYiBIkxEBIkxAx/9zKIgIiIH/9k='
                        alt='avacada'
                        borderRadius='lg'
                        h="300"
                        w="300"
                      />
                      <Heading size='md'> Week 16! </Heading>
                      <Text>
                        Swollen and bleeding gums
                        Pains on the side of your belly, caused by your expanding womb
                        Headaches.
                        Nosebleeds.
                        Feeling bloated
                      </Text>
                    </Stack>
                  </CardBody>
                </Card>
              </VStack>
            </HStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
