/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import RadioGroup from './common/RadioGroup';
import { LIST_FILTERED_USERS } from "./graphQL/query/queries"; // Import query
import { useQuery } from '@apollo/client';

function HomeScreen(): React.JSX.Element {
  const [selectedRole, setSelectedRole] = useState("ADMIN"); // Default selection
  const [filteredUsers, setFilteredUsers] = useState([]); // Default selection

  const { data } = useQuery(LIST_FILTERED_USERS, {
    variables: {
      filter: { role: { eq: selectedRole } },
      limit: 10, // Limit results
    },
  });

  useEffect(() => {
    if(data){
        setFilteredUsers(data?.listZellerCustomers?.items)
    }
  }, [selectedRole,data])

  const renderUserTypesSection = () => {
    return (
      <View>
        <View>
          <Text style={styles.headerText}>User Types</Text>
        </View>
        <View>
          <RadioGroup getUserSelection={(value: string) => setSelectedRole(value)} />
        </View>
      </View>
    )
  }

  const renderUserList = () => {
    return (
      <View>
        <View>
          <Text style={styles.headerText}>{`${selectedRole} Users`}</Text>
        </View>
        <View>
          {
            filteredUsers?.length > 0 ?
              <View style={{ marginTop: 20 }}>
                <FlatList
                  data={filteredUsers}
                  renderItem={({ item, index }) => (
                    <View style={{ flex: 1, margin: 5 }}>
                      <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={[styles.centerAlign, { height: 50, width: 50, borderRadius: 5, backgroundColor: "lightblue" }]}>
                          <Text style={{ fontSize: 14, fontWeight: "bold" }}>{item.name.charAt(0)}</Text>
                        </View>
                        <View style={{ marginHorizontal: 10, justifyContent: "space-evenly" }}>
                          <View>
                            <Text style={{ fontSize: 16 }}>
                              {item.name}
                            </Text>
                          </View>
                          <View>
                            <Text style={{ fontSize: 14, color: "grey" }}>
                              {item.role}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
                />
              </View>
              :
              null
          }
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.flex1}>
      <View style={[styles.container]}>
        {
          renderUserTypesSection()
        }
        {
          renderUserList()
        }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1
  },
  centerAlign: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    marginTop: "10%",
    padding: 10
  },
  headerText: {
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 18,
    letterSpacing: 1
  }
});

export default HomeScreen;
