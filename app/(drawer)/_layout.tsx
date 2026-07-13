// import { Tabs } from 'expo-router';
// import React from 'react';

// import { HapticTab } from '@/components/haptic-tab';
// import { IconSymbol } from '@/components/ui/icon-symbol';
// import { Colors } from '@/constants/theme';
// import { useColorScheme } from '@/hooks/use-color-scheme';

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         headerShown: false,
//         tabBarButton: HapticTab,
//       }}>
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="explore"
//         options={{
//           title: 'Explore',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="new_tab"
//         options={{
//           title: 'New Tab',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="home"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="product"
//         options={{
//           title: 'Product',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="scrollView"
//         options={{
//           title: 'Scroll',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="setting"
//         options={{
//           title: 'SETTINGS',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// }

import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function DrawerLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: true, 
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: 'Home',
            drawerIcon: ({ color, size }) => (
              <IconSymbol size={size ?? 24} name="house.fill" color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="explore"
          options={{
            title: 'Explore',
            drawerIcon: ({ color, size }) => (
              <IconSymbol size={size ?? 24} name="paperplane.fill" color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="new_tab"
          options={{
            title: 'New Tab',
            drawerIcon: ({ color, size }) => (
              <IconSymbol size={size ?? 24} name="house.fill" color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="home"
          options={{
            title: 'Home View',
            drawerIcon: ({ color, size }) => (
              <IconSymbol size={size ?? 24} name="house.fill" color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="product"
          options={{
            title: 'Product',
            drawerIcon: ({ color, size }) => (
              <IconSymbol size={size ?? 24} name="house.fill" color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="scrollView"
          options={{
            title: 'Scroll',
            drawerIcon: ({ color, size }) => (
              <IconSymbol size={size ?? 24} name="house.fill" color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="setting"
          options={{
            title: 'SETTINGS',
            drawerIcon: ({ color, size }) => (
              <IconSymbol size={size ?? 24} name="house.fill" color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}