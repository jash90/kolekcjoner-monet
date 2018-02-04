import React, {Component} from 'react';
import {Dimensions, Image, Modal, ScrollView, TouchableWithoutFeedback, View} from 'react-native';
import * as _ from 'lodash';

class PhotoGrid extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            photoUrl: '',
            timer: 1000,
            time: 0
        };

    }

    photoPopupToggle(photoUrl) {
        this.setState({
            modalVisible: !this.state.modalVisible,
            photoUrl
        });
    }

    photoOut() {
        this.setState({
            modalVisible: !this.state.modalVisible,
            time: 0
        });
    }

    renderChunk() {
        let chunk = _.chunk(this.props.PhotosList, 9);

        return chunk.map((chunkItem, index) => {
            let row = _.chunk(chunkItem, 3);

            return row.map((rowItem, rowIndex) => {

                return this.renderPhotoRow(rowItem, rowIndex);
            })

        })

    }

    renderPhotoRow(rowItem, rowIndex) {

        if (rowIndex == 0) {
            return this.renderPhotoRow1(rowItem);
        } else if (rowIndex == 1) {
            return this.renderPhotoRow2(rowItem);
        } else if (rowIndex == 2) {
            return this.renderPhotoRow3(rowItem);
        }

    }

    renderPhotoRow1(row) {
        return (
            <View style={styles.alignCenter}>
                {row.map((item, index) => {
                    return (
                        <View
                            style={[
                                styles.photoView, {
                                    borderRadius: this.props.borderRadius
                                }
                            ]}>
                            <TouchableWithoutFeedback
                                onPressIn={() => {
                                    this.photoPopupToggle(item)
                                }}
                                onPressOut={() => {
                                    this.photoOut()
                                }}>
                                <Image
                                    resizeMode="contain"
                                    source={typeof item === 'string' ? {uri: item} : item}
                                    style={[
                                        styles.imageStyle, {
                                            borderRadius: this.props.borderRadius
                                        }
                                    ]}/>
                            </TouchableWithoutFeedback>
                        </View>
                    )
                })
                }

            </View>
        )
    }

    renderPhotoRow2(row) {

        if (row.length == 1) {
            return (
                <View style={styles.alignCenter}>
                    <View
                        style={[
                            styles.expandedView, {
                                borderRadius: this.props.borderRadius
                            }
                        ]}>
                        <TouchableWithoutFeedback
                            onPressIn={() => {
                                this.photoPopupToggle(row[0])
                            }}
                            onPressOut={() => {
                                this.photoOut()
                            }}>
                            <Image
                                resizeMode="contain"
                                source={typeof row[0] === 'string' ? {uri: row[0]} : row[0]}
                                style={[
                                    styles.imageStyle,
                                    styles.expandedImage, {
                                        borderRadius: this.props.borderRadius
                                    }
                                ]}/>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            )
        } else if (row.length == 2) {
            return (
                <View style={styles.alignCenter}>
                    <View
                        style={[
                            styles.expandedView, {
                                borderRadius: this.props.borderRadius
                            }
                        ]}>
                        <TouchableWithoutFeedback
                            onPressIn={() => {
                                this.photoPopupToggle(row[0])
                            }}
                            onPressOut={() => {
                                this.photoOut()
                            }}>
                            <Image
                                resizeMode="contain"
                                source={typeof row[0] === 'string' ? {uri: row[0]} : row[0]}
                                style={[
                                    styles.imageStyle,
                                    styles.expandedImage, {
                                        borderRadius: this.props.borderRadius
                                    }
                                ]}/>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.flexCol}>
                        <View
                            style={[
                                styles.photoView, {
                                    borderRadius: this.props.borderRadius
                                }
                            ]}>
                            <TouchableWithoutFeedback
                                onPressIn={() => {
                                    this.photoPopupToggle(row[1])
                                }}
                                onPressOut={() => {
                                    this.photoOut()
                                }}>
                                <Image
                                    resizeMode="contain"
                                    source={typeof row[1] === 'string' ? {uri: row[1]} : row[1]}
                                    style={[
                                        styles.imageStyle, {
                                            borderRadius: this.props.borderRadius
                                        }
                                    ]}/>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            )

        } else if (row.length == 3) {
            return (
                <View style={styles.alignCenter}>
                    <View
                        style={[
                            styles.expandedView, {
                                borderRadius: this.props.borderRadius
                            }
                        ]}>
                        <TouchableWithoutFeedback
                            onPressIn={() => {
                                this.photoPopupToggle(row[0])
                            }}
                            onPressOut={() => {
                                this.photoOut()
                            }}>
                            <Image
                                resizeMode="contain"
                                source={typeof row[0] === 'string' ? {uri: row[0]} : row[0]}
                                style={[
                                    styles.imageStyle,
                                    styles.expandedImage, {
                                        borderRadius: this.props.borderRadius
                                    }
                                ]}/>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.flexCol}>
                        <View
                            style={[
                                styles.photoView, {
                                    borderRadius: this.props.borderRadius
                                }
                            ]}>
                            <TouchableWithoutFeedback
                                onPressIn={() => {
                                    this.photoPopupToggle(row[1])
                                }}
                                onPressOut={() => {
                                    this.photoOut()
                                }}>
                                <Image
                                    resizeMode="contain"
                                    source={typeof row[1] === 'string' ? {uri: row[1]} : row[1]}
                                    style={[
                                        styles.imageStyle, {
                                            borderRadius: this.props.borderRadius
                                        }
                                    ]}/>
                            </TouchableWithoutFeedback>
                        </View>
                        <View
                            style={[
                                styles.photoView, {
                                    borderRadius: this.props.borderRadius
                                }
                            ]}>
                            <TouchableWithoutFeedback
                                onPressIn={() => {
                                    this.photoPopupToggle(row[2])
                                }}
                                onPressOut={() => {
                                    this.photoOut()
                                }}>
                                <Image
                                    resizeMode="contain"
                                    source={typeof row[2] === 'string' ? {uri: row[2]} : row[2]}
                                    style={[
                                        styles.imageStyle, {
                                            borderRadius: this.props.borderRadius
                                        }
                                    ]}/>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            )

        }

    }

    renderPhotoRow3(row) {

        if (row.length == 1) {
            return (
                <View style={styles.alignCenter}>
                    <View style={styles.flexCol}>
                        <View
                            style={[
                                styles.photoView, {
                                    borderRadius: this.props.borderRadius
                                }
                            ]}>
                            <TouchableWithoutFeedback
                                onPressIn={() => {
                                    this.photoPopupToggle(row[0])
                                }}
                                onPressOut={() => {
                                    this.photoOut()
                                }}>
                                <Image
                                    resizeMode="contain"
                                    source={typeof row[0] === 'string' ? {uri: row[0]} : row[0]}
                                    style={[
                                        styles.imageStyle, {
                                            borderRadius: this.props.borderRadius
                                        }
                                    ]}/>
                            </TouchableWithoutFeedback>
                        </View>

                    </View>
                </View>
            )
        } else if (row.length == 2) {
            return (
                <View style={styles.alignCenter}>
                    <View style={styles.flexCol}>
                        <View
                            style={[
                                styles.photoView, {
                                    borderRadius: this.props.borderRadius
                                }
                            ]}>
                            <TouchableWithoutFeedback
                                onPressIn={() => {
                                    this.photoPopupToggle(row[0])
                                }}
                                onPressOut={() => {
                                    this.photoOut()
                                }}>
                                <Image
                                    resizeMode="contain"
                                    source={typeof row[0] === 'string' ? {uri: row[0]} : row[0]}
                                    style={[
                                        styles.imageStyle, {
                                            borderRadius: this.props.borderRadius
                                        }
                                    ]}/>
                            </TouchableWithoutFeedback>
                        </View>
                        <View
                            style={[
                                styles.photoView, {
                                    borderRadius: this.props.borderRadius
                                }
                            ]}>
                            <TouchableWithoutFeedback
                                onPressIn={() => {
                                    this.photoPopupToggle(row[1])
                                }}
                                onPressOut={() => {
                                    this.photoOut()
                                }}>
                                <Image
                                    resizeMode="contain"
                                    source={typeof row[1] === 'string' ? {uri: row[1]} : row[1]}
                                    style={[
                                        styles.imageStyle, {
                                            borderRadius: this.props.borderRadius
                                        }
                                    ]}/>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            )

        } else if (row.length == 3) {
            return (
                <View style={styles.alignCenter}>

                    <View style={styles.flexCol}>
                        <View
                            style={[
                                styles.photoView, {
                                    borderRadius: this.props.borderRadius
                                }
                            ]}>
                            <TouchableWithoutFeedback
                                onPressIn={() => {
                                    this.photoPopupToggle(row[0])
                                }}
                                onPressOut={() => {
                                    this.photoOut()
                                }}>
                                <Image
                                    resizeMode="contain"
                                    source={typeof row[0] === 'string' ? {uri: row[0]} : row[0]}
                                    style={[
                                        styles.imageStyle, {
                                            borderRadius: this.props.borderRadius
                                        }
                                    ]}/>
                            </TouchableWithoutFeedback>
                        </View>
                        <View
                            style={[
                                styles.photoView, {
                                    borderRadius: this.props.borderRadius
                                }
                            ]}>
                            <TouchableWithoutFeedback
                                onPressIn={() => {
                                    this.photoPopupToggle(row[1])
                                }}
                                onPressOut={() => {
                                    this.photoOut()
                                }}>
                                <Image
                                    resizeMode="contain"
                                    source={typeof row[1] === 'string' ? {uri: row[1]} : row[1]}
                                    style={[
                                        styles.imageStyle, {
                                            borderRadius: this.props.borderRadius
                                        }
                                    ]}/>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <View
                        style={[
                            styles.expandedView, {
                                borderRadius: this.props.borderRadius
                            }
                        ]}>
                        <TouchableWithoutFeedback
                            onPressIn={() => {
                                this.photoPopupToggle(row[2])
                            }}
                            onPressOut={() => {
                                this.photoOut()
                            }}>
                            <Image
                                resizeMode="contain"
                                source={typeof row[2] === 'string' ? {uri: row[2]} : row[2]}
                                style={[
                                    styles.imageStyle,
                                    styles.expandedImage, {
                                        borderRadius: this.props.borderRadius
                                    }
                                ]}/>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            )

        }

    }

    renderGrid() {
        return (
            <ScrollView canCancelContentTouches={false}>
                {this.renderChunk()}
            </ScrollView>
        )
    }

    render() {

        return (
            <View style={[styles.container]}>
                {this.renderGrid()}
                <View>
                    <Modal
                        animationType={"fade"}
                        transparent={false}
                        onRequestClose={() => {
                        }}
                        visible={this.state.modalVisible}>
                        <View style={styles.overlay}>
                            <View style={styles.containerModal}>
                                <View
                                    style={{
                                        backgroundColor: "#fff",
                                        width: "100%",
                                        flex: 1
                                    }}/>
                                <Image
                                    source={{uri: this.state.photoUrl}}
                                    resizeMode="contain"
                                    style={{
                                        width: "100%",
                                        flex: 5
                                    }}/>
                                <View
                                    style={{
                                        backgroundColor: "#fff",
                                        width: "100%",
                                        flex: 1
                                    }}/>
                            </View>
                        </View>
                    </Modal>
                </View>

            </View>

        )
    }

}

const styles = {

    container: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageStyle: {
        flex: 1,
        height: 120,
        resizeMode: 'contain',
        backgroundColor: '#fff'
    },

    flexCol: {
        flexDirection: 'column',
        flex: 1
    },
    alignCenter: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions
            .get('window')
            .width - 20,
        paddingRight: 5
    },

    photoView: {
        height: 120,
        flex: 2,
        backgroundColor: 'gray',
        marginHorizontal: 5,
        marginVertical: 5,
        justifyContent: 'center'
    },
    expandedView: {
        height: 249,
        backgroundColor: 'gray',
        marginHorizontal: 5,
        marginVertical: 5,
        flex: 2
    },
    expandedImage: {
        height: 249
    },
    overlay: {
        width: '100%',
        height: '100%',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.85)",
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    containerModal: {
        width: "90%",
        height: "80%",
        backgroundColor: "#fff",
        borderRadius: 5
    }
}

export {PhotoGrid};