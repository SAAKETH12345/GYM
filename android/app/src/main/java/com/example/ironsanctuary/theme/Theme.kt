package com.example.ironsanctuary.theme

import android.app.Activity
import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

private val BrutalistColorScheme = darkColorScheme(
    primary = BrandRed,
    secondary = BrandRedDark,
    tertiary = BrandWhite,
    background = BrandBlack,
    surface = BrandGray,
    onPrimary = BrandWhite,
    onSecondary = BrandWhite,
    onTertiary = BrandBlack,
    onBackground = BrandWhite,
    onSurface = BrandWhite,
)

@Composable
fun IronSanctuaryTheme(
    // We enforce dark mode brutalist scheme regardless of system preference for this app
    darkTheme: Boolean = true,
    dynamicColor: Boolean = false, // Disable dynamic color to enforce brand
    content: @Composable () -> Unit
) {
    val colorScheme = BrutalistColorScheme
    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = colorScheme.background.toArgb()
            WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = false
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        shapes = BrutalistShapes,
        content = content
    )
}
