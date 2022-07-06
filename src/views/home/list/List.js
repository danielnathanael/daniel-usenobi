import React, { useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, FlatList, Image } from "react-native"
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Services from '../../../services/Services'

const List = () => {

    const [search, setSearch] = React.useState('')
    const [items, setItems] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    useEffect(() => {
        const fetchList = async () => {
            let result = await Services.getList()
            if (result.status === 200) {
                setItems(result.data.data)
            }
        }

        fetchList()
    }, [])

    let filteredItems = items
    if (search != null && search.length > 0) {
        filteredItems = []
        for (let item of items) {
            if (item.ticker.toLowerCase().includes(search.toLowerCase())) {
                filteredItems.push(item)
            }
        }
    }

    return <View style={styles.screen}>
        <LinearGradient colors={['#102445', '#000000']} style={styles.screen}>
            <View style={styles.searchContainer}>
                <Icon
                    name='search'
                    size={20}
                    style={styles.searchPrefix}
                />
                <TextInput
                    style={styles.searchInput}
                    placeholder='Search'
                    onChangeText={(text) => setSearch(text)}
                />
            </View>
            {
                loading ?
                    <ActivityIndicator color={styles.loading.color} size={20} />
                    :
                    <FlatList
                        data={filteredItems}
                        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'grey', marginHorizontal: 16 }}></View>}
                        renderItem={({ item }) => <View style={styles.listItemContainer}>
                            <View style={styles.listItemLeftSection}>
                                <Image source={{ uri: item.image }} style={{ width: 30, height: 30 }} />
                                <Text style={styles.listItemTicker}>{item.ticker}</Text>
                            </View>
                            <Text style={styles.listItemTicker}>{Number(item.amount).toFixed(8)}</Text>
                        </View>}
                    />
            }
        </LinearGradient>
    </View>
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    searchContainer: {
        margin: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 16,
        backgroundColor: '#152f5a',
        borderRadius: 8,
    },
    searchInput: {
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 16,
        flex: 1,
    },
    searchPrefix: {
        paddingLeft: 16,
    },
    loading: {
        color: '#ffffff',
    },
    listItemContainer: {
        marginHorizontal: 16,
        paddingVertical: 12,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    listItemLeftSection: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    listItemTicker: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    }
})

export default List