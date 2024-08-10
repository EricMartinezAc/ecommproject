import React, { useState, useEffect } from "react";
import { View } from "react-native";
import {
  Button as PaperButton,
  Dialog,
  Portal,
  TextInput as PaperTextInput,
  Card,
  Title,
  Paragraph,
} from "react-native-paper";
import { addService, fetchServices } from "../firebaseService";
import styles from "../styles";

const ServicesRoute = () => {
  const [services, setServices] = useState([]);
  const [isServiceModalVisible, setServiceModalVisible] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");
  const [serviceSubcategory, setServiceSubcategory] = useState("");
  const [servicePrice, setServicePrice] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const servicesList = await fetchServices();
      setServices(servicesList);
    };
    fetchData();
  }, []);

  const handleAddService = async () => {
    try {
      const service = {
        name: serviceName,
        category: serviceCategory,
        subcategory: serviceSubcategory,
        price: servicePrice,
      };
      await addService(service);
      setServiceModalVisible(false);
      setServiceName("");
      setServiceCategory("");
      setServiceSubcategory("");
      setServicePrice("");
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  return (
    <View style={styles.container}>
      {services.map((item) => (
        <Card key={item.id} style={styles.card}>
          <Card.Content>
            <Title>{item.name}</Title>
            <Paragraph>Category: {item.category}</Paragraph>
            <Paragraph>Subcategory: {item.subcategory}</Paragraph>
            <Paragraph>Price: ${item.price}</Paragraph>
          </Card.Content>
        </Card>
      ))}
      <PaperButton
        mode="contained"
        onPress={() => setServiceModalVisible(true)}
      >
        Add Service
      </PaperButton>
      <Portal>
        <Dialog
          visible={isServiceModalVisible}
          onDismiss={() => setServiceModalVisible(false)}
        >
          <Dialog.Title>Add Service</Dialog.Title>
          <Dialog.Content>
            <PaperTextInput
              label="Name"
              style={styles.input}
              value={serviceName}
              onChangeText={setServiceName}
            />
            <PaperTextInput
              label="Category"
              style={styles.input}
              value={serviceCategory}
              onChangeText={setServiceCategory}
            />
            <PaperTextInput
              label="Subcategory"
              style={styles.input}
              value={serviceSubcategory}
              onChangeText={setServiceSubcategory}
            />
            <PaperTextInput
              label="Price"
              style={styles.input}
              value={servicePrice}
              onChangeText={setServicePrice}
            />
            <PaperButton mode="contained" onPress={handleAddService}>
              Save
            </PaperButton>
            <PaperButton
              mode="text"
              onPress={() => setServiceModalVisible(false)}
            >
              Cancel
            </PaperButton>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};

export default ServicesRoute;
