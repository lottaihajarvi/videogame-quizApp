import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Button, Icon, ListItem, Avatar } from 'react-native-elements';


export default function HighScores({ route, navigation }) {


    const { username, score, scores, deleteHighscore } = route.params;

    const renderHighscore = ({ item }) => (
        <ListItem bottomDivider>
            <Avatar rounded icon={{ name: 'user', color: '#fff', type: 'font-awesome' }} overlayContainerStyle={{ backgroundColor: 'gray' }} />
            <ListItem.Content>
                <ListItem.Title>{item.username}</ListItem.Title>
                <ListItem.Subtitle>{item.score}/10</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron type="material-community" name="delete-sweep-outline" color='#517fa4' size={30} onPress={() => deleteHighscore(item.id)} />
        </ListItem>
    )

    return (
        <View style={styles.container}>
            <View style={styles.bgcontainer}>
                <View style={styles.textcontainer}>
                    <View style={styles.iconcontainer}>
                        <Icon type="material-community" name="trophy" color='#fff' size={29} />
                        <Text style={{ color: 'white', fontSize: 20, fontFamily: 'serif', marginLeft: 10, marginRight: 10 }}>Highscores</Text>
                        <Icon type="material-community" name="trophy" color='#fff' size={29} />
                    </View>
                    <View style={styles.listcontainer}>
                        <FlatList
                            data={scores.sort((a, b) => b.score - a.score)}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderHighscore}
                        />
                    </View>
                </View>
            </View>
            <Button icon={{ name: 'repeat', color: '#fff', textAlign: 'center' }} buttonStyle={{ width: 200, height: 50, marginTop: 20, marginBottom: 30, borderRadius: 20, backgroundColor: '#517fa4' }} title="Try Again" type="solid" onPress={() => navigation.navigate('Home')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#eef3f7',
        alignItems: 'center',
        justifyContent: 'center'

    },

    textcontainer: {
        textAlign: 'center',
        paddingTop: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'

    },

    resultscontainer: {
        flexDirection: 'row',
        textAlign: 'center',
        paddingTop: 20


    },

    iconcontainer: {
        flexDirection: 'row',
        paddingTop: 20


    },

    bgcontainer: {
        flex: 3,
        backgroundColor: '#517fa4',
        width: 500

    },

    listcontainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#517fa4',
        alignItems: 'flex-start',
        width: 410,
        marginTop: 10

    },

});

