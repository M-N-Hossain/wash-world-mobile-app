import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import Navigation from "./Navigation";
import { logout } from "./redux/userSlice";
import { store } from "./store/store";
import { setupLogoutHandler } from "./utils/axiosInterceptor";

const queryClient = new QueryClient();

// Set up the logout handler with the store's dispatch
// This breaks the circular dependency by calling setupLogoutHandler after store is created
setupLogoutHandler(() => {
  store.dispatch(logout());
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Navigation />
        </GestureHandlerRootView>
      </Provider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
