import React, { useState } from "react";
import { Provider } from "react-native-paper";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import ProductsRoute from "./src/components/ProductsRoute";
import ServicesRoute from "./src/components/ServicesRoute";
import AuthRoute from "./src/components/AuthRoute";

const App = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "products", title: "Products" },
    { key: "services", title: "Services" },
    { key: "auth", title: "Auth" },
  ]);

  const renderScene = SceneMap({
    products: ProductsRoute,
    services: ServicesRoute,
    auth: AuthRoute,
  });

  return (
    <Provider>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: 400 }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: "blue" }}
            style={{ backgroundColor: "white" }}
          />
        )}
      />
    </Provider>
  );
};

export default App;
