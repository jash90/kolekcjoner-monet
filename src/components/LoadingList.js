import React, {Component} from 'react';
import {View, Text} from 'react-native';
import ModalLoading from './ModalLoading';
class LoadingList extends Component {
    render() {
        return (
            <View
                style={{
                alignItems: "center",
                justifyContent: "center"
            }}>
                {this.props.loading
                    ? <ModalLoading visible={this.props.loading} text={this.props.loadingText}/>
                    : this.props.condition
                        ? <View
                                style={{
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <Text>{this.props.text}</Text>
                            </View>
                        : this.props.children
}
            </View>
        );
    }
}

export default LoadingList;