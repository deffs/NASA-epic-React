/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ListView, Image} from 'react-native';

type Props = {};
export default class App extends Component<Props> {

  constructor() {
    super();
    this.state={
      dataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!=r2}),
      link: 'http://epic.gsfc.nasa.gov/api/natural',
    }
  }

  componentDidMount(){
    fetch(this.state.link)
    .then((response) => response.json())
    .then((responseJson) => {
      data = responseJson;
      for (x in data) {
        var imageId = data[x]["image"];
        var date = data[x]["identifier"].toString();
        var year = date.substring(0,4);
        var month = date.substring(4,6);
        var day = date.substring(6,8);
        var urlBase = "https://epic.gsfc.nasa.gov/archive/natural/"+year+"/"+month+"/"+day+"/png/";
        var imageURL = urlBase+imageId+".png";
        data[x]["image"] = imageURL;
      }

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data)
      })
    })
    .catch((error) => {
        console.error(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>NASA's EPIC Camera</Text>
        <ListView dataSource={this.state.dataSource}
        renderRow={(rowData)=>
          <View>
          <View style={styles.card}>
          <Image style={{width:'80%',height:'60%', borderRadius: 10}} source={{uri:rowData.image}}>
          </Image>
          <Text style={styles.id}>ID: {rowData.identifier}</Text>
          <Text style={styles.caption}>{rowData.caption}</Text>
          </View>
          </View>
        }
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  card: {
    flexDirection: 'column',
    flex:2,
    width: 300,
    height: 400,
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginBottom: 20,
    margin: 20,
    padding: 10,
    elevation: 10,
    alignItems: 'center'
  },
  caption: {
    marginTop: 40,
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'sans-serif',
  },
  id: {
    textAlign: 'left',
    fontSize: 15,
    color: '#FFFFFF',
    fontFamily: 'sans-serif',
  },
  title: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'sans-serif',
  }
});
