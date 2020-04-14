package com.duoduo_comic;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.reactnativecommunity.art.ARTPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import org.capslock.RNDeviceBrightness.RNDeviceBrightness;
import com.rctbattery.BatteryManagerPackage;
import com.robinpowered.react.battery.DeviceBatteryPackage;
import com.robinpowered.react.battery.DeviceBatteryPackage;
import com.ruliang.cache.RNHttpCachePackage;
import cn.reactnative.httpcache.HttpCachePackage;
import com.rctbattery.BatteryManagerPackage;
import com.robinpowered.react.battery.DeviceBatteryPackage;
import com.ruliang.cache.RNHttpCachePackage;
import com.facebook.react.ReactInstanceManager;
import com.microsoft.codepush.react.CodePush;
import cn.reactnative.httpcache.HttpCachePackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.imagepicker.ImagePickerPackage;

import org.capslock.RNDeviceBrightness.RNDeviceBrightness;
import com.robinpowered.react.battery.DeviceBatteryPackage;
import com.psykar.cookiemanager.CookieManagerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.cmcewen.blurview.BlurViewPackage;
import java.lang.reflect.InvocationTargetException;
import java.util.List;


public class MainApplication extends Application implements ReactApplication {

  @Override
  protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
  }

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new CodePush(BuildConfig.CODEPUSH_KEY,getApplicationContext(), BuildConfig.DEBUG, getResources().getString(R.string.reactNativeCodePush_androidServerURL)));
          packages.add(new HttpCachePackage());
          packages.add(new RNFetchBlobPackage());
          packages.add(new RNSpinkitPackage());
          packages.add(new FastImageViewPackage());
          packages.add(new VectorIconsPackage());
          packages.add(new SplashScreenReactPackage());
          packages.add(new OrientationPackage());
          packages.add(new ImagePickerPackage());
          packages.add(new RNDeviceBrightness();
          packages.add(new DeviceBatteryPackage());
          packages.add(new CookieManagerPackage());
          packages.add(new BlurViewPackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.duoduo_comic.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
