import React, { useState } from 'react';
import coverImg from '../../../assets/shop/order.jpg';
import Cover from '../../Shared/Cover/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import OrderTabCard from '../../Shared/OrderTabCard/OrderTabCard';
import useMenu from '../../../hooks/useMenu';
import OrderTab from './OrderTab/OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
const Order = () => {
    const categories = ['salad','pizza', 'soup', 'dessert' , 'drinks']
    const { category } = useParams()
    const initialIndex = categories.indexOf(category)

    const [tabIndex, setTabIndex] = useState(initialIndex)

    const [menu] = useMenu()




    const desserts = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const offered = menu.filter(item => item.category === 'offered')
    const drinks = menu.filter(item => item.category === 'drinks')

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Order Food</title>
            </Helmet>
            <Cover img={coverImg} title={"Our Shop"}></Cover>
            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>Desserts</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    {/* <Tab>Offered</Tab> */}
                    <Tab>Drinks</Tab>
                </TabList>

                <TabPanel>
                <OrderTab items={desserts}></OrderTab>

                </TabPanel>
             

                <TabPanel>
                <OrderTab items={soup}></OrderTab>
                </TabPanel>

                <TabPanel>
                <OrderTab items={salad}></OrderTab>
                </TabPanel>

                <TabPanel>
                <OrderTab items={pizza}></OrderTab>
                </TabPanel>

{/* 
                <TabPanel>
                <OrderTab items={offered}></OrderTab>
                </TabPanel> */}


                <TabPanel>
                <OrderTab items={drinks}></OrderTab>
                </TabPanel>

                
            </Tabs>
        </div>
    );
};

export default Order;