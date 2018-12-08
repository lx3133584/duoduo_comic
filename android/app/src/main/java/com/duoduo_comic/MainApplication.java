package com.duoduo_comic;

import android.app.Application;

import com.facebook.react.ReactApplication;
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
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.cmcewen.blurview.BlurViewPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFetchBlobPackage(),
            new RNSpinkitPackage(),
            new FastImageViewPackage(),
            new VectorIconsPackage(),
            new SplashScreenReactPackage(),
            new OrientationPackage(),
            new ImagePickerPackage(),
            new RNDeviceBrightness(),
            new DeviceBatteryPackage(),
            new CookieManagerPackage(),
            new BlurViewPackage()
      );
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
  }
}
