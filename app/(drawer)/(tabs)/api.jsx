import { Button, StyleSheet, Text, View, FlatList, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'

const apiii = () => {
    const [data, setdata] = useState([]);
    const [search, setseacrh] = useState("");

    const onlcick = async () => {
        const res = await fetch(`https://fakestoreapi.com/products`);
        const products = await res.json();

        setdata(products);
    }

    useEffect(() => {
        const timer = setTimeout(async () => {
            const res = await fetch(`https://fakestoreapi.com/products`);
            const products = await res.json();

            const filterrdata = products.filter((item) =>
                item.title.toLowerCase().includes(search.toLowerCase().trim())
            );

            setdata(filterrdata);
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [search]);

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <Text>api data</Text>

            <TextInput
                placeholder='enter to search'
                onChangeText={setseacrh}
            />

            <Button
                onPress={onlcick}
                title='click me'
            />

            <FlatList
                style={{ flex: 1 }}
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text>{item.title}</Text>
                )}
            />
        </View>
    )
}

export default apiii

const styles = StyleSheet.create({})