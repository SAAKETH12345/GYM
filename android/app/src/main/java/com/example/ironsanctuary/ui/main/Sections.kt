package com.example.ironsanctuary.ui.main

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.spring
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.slideInVertically
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.awaitEachGesture
import androidx.compose.foundation.gestures.awaitFirstDown
import androidx.compose.foundation.gestures.waitForUpOrCancellation
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsPressedAsState
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
// Removed icon imports
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
// Removed zIndex import
import androidx.compose.foundation.lazy.LazyListState
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.gestures.snapping.rememberSnapFlingBehavior
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.ui.text.style.TextAlign
import com.example.ironsanctuary.theme.*

@Composable
fun HeroSection(scrollState: LazyListState, index: Int) {
    var visible by remember { mutableStateOf(false) }
    val configuration = LocalConfiguration.current
    val screenHeight = configuration.screenHeightDp.dp

    val scrollOffset by remember {
        derivedStateOf {
            if (scrollState.firstVisibleItemIndex == index) {
                scrollState.firstVisibleItemScrollOffset.toFloat()
            } else 0f
        }
    }

    LaunchedEffect(Unit) {
        visible = true
    }

    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(screenHeight)
            .background(BrandRedDark)
            .graphicsLayer {
                translationY = scrollOffset * 0.5f // parallax effect
                scaleY = 1f + (scrollOffset * 0.001f) // stark clipping mask scale
                clip = true
            },
        contentAlignment = Alignment.Center
    ) {
        // Deep Red Gradient Background
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(
                    Brush.verticalGradient(
                        colors = listOf(BrandRed, BrandRedDark)
                    )
                )
        )

        // Massive Text Behind Athlete
        AnimatedVisibility(
            visible = visible,
            enter = slideInVertically(
                initialOffsetY = { it / 2 },
                animationSpec = spring(
                    dampingRatio = Spring.DampingRatioNoBouncy,
                    stiffness = Spring.StiffnessLow
                )
            ) + fadeIn(
                animationSpec = tween(durationMillis = 1000)
            ),
            modifier = Modifier.align(Alignment.Center)
        ) {
            Text(
                text = "VELOCITY",
                style = MaterialTheme.typography.displayLarge.copy(
                    fontSize = (configuration.screenWidthDp / 5.5).sp, 
                    color = Color.White.copy(alpha = 0.95f),
                    letterSpacing = (-6).sp
                ),
                maxLines = 1,
                softWrap = false
            )
        }

        // Athlete Image Placeholder (High contrast vector for now)
        // Athlete Image Placeholder
        Box(
            modifier = Modifier
                .fillMaxSize(0.8f)
                .padding(top = 100.dp)
                .alpha(0.8f)
                .background(Color.Black.copy(alpha=0.5f)),
            contentAlignment = Alignment.Center
        ) {
            Text("ATHLETE PLACEHOLDER", color = Color.White)
        }

        // Extra Overlay for moody contrast
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(
                    Brush.verticalGradient(
                        colors = listOf(Color.Transparent, Color.Black.copy(alpha = 0.7f)),
                        startY = 800f
                    )
                )
        )

        // Telemetry UI Overlays - Top/Bottom
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(32.dp),
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            // Top Section - Navigation Button
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 16.dp),
                contentAlignment = Alignment.Center
            ) {
                BrutalistButton(text = "ENTER THE VAULT", onClick = { /* Navigate to Vault */ })
            }
            
            // Bottom Section - Telemetry Specs
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 16.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.Bottom
            ) {
                // Left Accents
                Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
                    TelemetryItem("+ TENSION")
                    TelemetryItem("+ IMMERSION")
                    TelemetryItem("+ IMPACT")
                }
                
                // Right Timers
                Column(horizontalAlignment = Alignment.End) {
                    Text(
                        text = "SYS.ON",
                        style = MaterialTheme.typography.labelLarge.copy(
                            color = Color.White.copy(alpha = 0.4f),
                            letterSpacing = 4.sp
                        )
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "[ 00:00:01 ]",
                        style = MaterialTheme.typography.labelLarge.copy(
                            color = Color.White
                        )
                    )
                }
            }
        }
    }
}

@Composable
fun TelemetryItem(text: String) {
    Text(
        text = text,
        style = MaterialTheme.typography.labelLarge.copy(
            color = Color.White,
            letterSpacing = 2.sp
        )
    )
}

@Composable
fun BrutalistButton(text: String, onClick: () -> Unit) {
    var isPressed by remember { mutableStateOf(false) }

    val bgColor by androidx.compose.animation.animateColorAsState(
        targetValue = if (isPressed) BrandBlack else Color.White,
        animationSpec = androidx.compose.animation.core.tween(0)
    )

    val textColor by androidx.compose.animation.animateColorAsState(
        targetValue = if (isPressed) Color.White else BrandBlack,
        animationSpec = androidx.compose.animation.core.tween(0)
    )

    Box(
        modifier = Modifier
            .pointerInput(Unit) {
                awaitPointerEventScope {
                    while (true) {
                        awaitFirstDown(requireUnconsumed = false)
                        isPressed = true
                        waitForUpOrCancellation()
                        isPressed = false
                        onClick()
                    }
                }
            }
            .drawBehind {
                // Solid 4dp offset shadow with exactly 0 blur
                val offsetPx = 4.dp.toPx()
                drawRect(
                    color = BrandRed,
                    topLeft = Offset(offsetPx, offsetPx),
                    size = Size(size.width, size.height)
                )
            }
            .offset(
                x = if (isPressed) 4.dp else 0.dp,
                y = if (isPressed) 4.dp else 0.dp
            )
            .background(bgColor)
            .border(2.dp, BrandBlack)
            .padding(horizontal = 32.dp, vertical = 16.dp),
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = text,
            style = MaterialTheme.typography.labelLarge.copy(
                color = textColor,
                fontWeight = FontWeight.Black,
                letterSpacing = 4.sp
            )
        )
    }
}

// ---------------------------------------------------------
// STUBS FOR REMAINING SECTIONS
// ---------------------------------------------------------

@Composable
fun ProtocolSection(
    scrollState: LazyListState,
    index: Int,
    id: String,
    title: String,
    desc: String,
    isLast: Boolean = false
) {
    val configuration = LocalConfiguration.current
    val screenHeight = configuration.screenHeightDp.dp
    
    val scrollOffset by remember {
        derivedStateOf {
            val itemInfo = scrollState.layoutInfo.visibleItemsInfo.find { it.index == index }
            itemInfo?.offset?.toFloat() ?: 0f
        }
    }

    Row(
        modifier = Modifier
            .fillMaxWidth()
            .height(screenHeight) 
            .drawBehind {
                if (!isLast) {
                    drawLine(BrandBlack, Offset(0f, size.height), Offset(size.width, size.height), 8.dp.toPx())
                }
            }
            .background(BrandRed)
            .graphicsLayer {
                // Parallax based on exact pixel offset from layoutInfo
                translationY = -scrollOffset * 0.25f
                clip = true
            }
    ) {
        // Left Text Section
        Column(
            modifier = Modifier
                .weight(1f)
                .fillMaxHeight()
                .padding(32.dp),
            verticalArrangement = Arrangement.Center
        ) {
            Text(
                text = "PROTOCOL // $id",
                style = MaterialTheme.typography.labelLarge.copy(
                    color = BrandBlack,
                    fontSize = 18.sp,
                    letterSpacing = 4.sp
                ),
                modifier = Modifier.padding(bottom = 24.dp)
            )
            
            Text(
                text = title.replace(" ", "\n"), // Stack words for massive typography impact
                style = MaterialTheme.typography.displayLarge.copy(
                    color = BrandWhite,
                    fontSize = 72.sp,
                    fontStyle = FontStyle.Italic
                ),
                modifier = Modifier.padding(bottom = 48.dp)
            )
            
            // High-contrast bordered container
            Box(
                modifier = Modifier
                    .background(BrandWhite)
                    .border(4.dp, BrandBlack)
                    .padding(24.dp)
                    .graphicsLayer {
                        shadowElevation = 16f // Emulate 8px block shadow natively
                        ambientShadowColor = Color.Black
                        spotShadowColor = Color.Black
                    }
            ) {
                Text(
                    text = desc,
                    style = MaterialTheme.typography.bodyLarge.copy(
                        color = BrandBlack,
                        fontSize = 18.sp
                    )
                )
            }
        }

        // Right Image Section (with stark image clipping mask effect)
        Box(
            modifier = Modifier
                .weight(1f)
                .fillMaxHeight()
                .background(BrandBlack)
                .drawBehind {
                    drawLine(BrandBlack, Offset(0f, 0f), Offset(0f, size.height), 8.dp.toPx())
                }
                .graphicsLayer {
                    // Apply absolute offset to scaleY to simulate stark clipping masks
                    scaleY = 1f + (Math.abs(scrollOffset) * 0.0015f)
                    clip = true
                }
        ) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .alpha(0.2f)
                    .background(Color.White),
                contentAlignment = Alignment.Center
            ) {
                Text("IMAGE", color = Color.Black)
            }

            // Brutalist Corner Numbering
            Box(
                modifier = Modifier
                    .align(Alignment.BottomEnd)
                    .padding(48.dp)
                    .background(BrandBlack.copy(alpha=0.8f))
                    .border(2.dp, BrandRed)
                    .padding(horizontal = 16.dp, vertical = 8.dp)
            ) {
                Text(
                    text = "[$id]",
                    style = MaterialTheme.typography.displaySmall.copy(
                        color = BrandRed,
                        letterSpacing = (-2).sp
                    )
                )
            }
        }
    }
}

@Composable
fun AdvancedTelemetrySection() {
    val configuration = LocalConfiguration.current
    val screenHeight = configuration.screenHeightDp.dp
    val screenWidth = configuration.screenWidthDp.dp

    val lazyRowState = rememberLazyListState()

    Box(modifier = Modifier.fillMaxWidth().height(screenHeight).background(BrandBlack)) {
        // Fixed Title for the section
        Box(
            modifier = Modifier
                .padding(32.dp)
                .background(BrandBlack)
                .drawBehind {
                    drawLine(BrandRed, Offset(0f, size.height), Offset(size.width, size.height), 4.dp.toPx())
                }
                .padding(bottom = 8.dp)
        ) {
            Text(
                text = "ADVANCED TELEMETRY //",
                style = MaterialTheme.typography.labelLarge.copy(
                    color = BrandRed,
                    fontSize = 16.sp,
                    letterSpacing = 4.sp
                )
            )
        }

        LazyRow(
            state = lazyRowState,
            flingBehavior = rememberSnapFlingBehavior(lazyListState = lazyRowState),
            horizontalArrangement = Arrangement.spacedBy(16.dp),
            modifier = Modifier.fillMaxSize().background(BrandBlack)
        ) {
            item { MuscleHeatmapPanel(screenWidth, screenHeight) }
            item { PlateCalculatorPanel(screenWidth, screenHeight) }
            item { BarVelocityPanel(screenWidth, screenHeight) }
        }
    }
}

@Composable
fun MuscleHeatmapPanel(width: androidx.compose.ui.unit.Dp, height: androidx.compose.ui.unit.Dp) {
    Box(
        modifier = Modifier
            .width(width)
            .height(height)
            .drawBehind {
                drawLine(BrandRed, Offset(size.width, 0f), Offset(size.width, size.height), 8.dp.toPx())
            }
    ) {
        // Grid Background
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(
                    Brush.linearGradient(
                        colors = listOf(BrandRed.copy(alpha=0.2f), Color.Transparent)
                    )
                )
        )
        
        // Diagnostic Corner Text
        Text(
            text = "[ SYS.DIAGNOSTIC... RUNNING ]",
            style = MaterialTheme.typography.labelLarge.copy(
                color = BrandWhite.copy(alpha = 0.5f),
                letterSpacing = 4.sp
            ),
            modifier = Modifier.align(Alignment.TopEnd).padding(32.dp)
        )

        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(32.dp),
            verticalArrangement = Arrangement.Center
        ) {
            Text(
                text = "[01] MUSCLE HEATMAP",
                style = MaterialTheme.typography.labelLarge.copy(
                    color = BrandRed,
                    fontSize = 24.sp,
                    letterSpacing = 2.sp
                ),
                modifier = Modifier.padding(bottom = 16.dp)
            )
            
            Text(
                text = "FATIGUE DETECTED.\nCHEST & TRICEPS COMPROMISED.",
                style = MaterialTheme.typography.displayMedium.copy(
                    color = BrandWhite,
                    fontSize = 60.sp,
                ),
                modifier = Modifier.padding(bottom = 32.dp)
            )

            Box(
                modifier = Modifier
                    .background(BrandWhite)
                    .border(4.dp, BrandRed)
                    .padding(24.dp)
                    .graphicsLayer {
                        shadowElevation = 16f
                        ambientShadowColor = BrandRed
                        spotShadowColor = BrandRed
                    }
            ) {
                Text(
                    text = "RE-ROUTING TO BACK & BICEPS PROTOCOL.",
                    style = MaterialTheme.typography.bodyLarge.copy(
                        color = BrandBlack,
                        fontSize = 20.sp
                    )
                )
            }
        }
    }
}

@Composable
fun PlateCalculatorPanel(width: androidx.compose.ui.unit.Dp, height: androidx.compose.ui.unit.Dp) {
    var isEngaged by remember { mutableStateOf(false) }

    // Violent snap animation, absolutely no soft easing
    val platesOffset by animateFloatAsState(
        targetValue = if (isEngaged) 0f else 200f,
        animationSpec = tween(durationMillis = 150),
        label = "Plate Snap"
    )

    Box(
        modifier = Modifier
            .width(width)
            .height(height)
            .drawBehind {
                drawLine(BrandRed, Offset(size.width, 0f), Offset(size.width, size.height), 8.dp.toPx())
            }
            .clickable(
                interactionSource = remember { MutableInteractionSource() },
                indication = null
            ) { isEngaged = !isEngaged }
    ) {
        // Grid Background
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(
                    Brush.linearGradient(
                        colors = listOf(BrandRed.copy(alpha=0.2f), Color.Transparent)
                    )
                )
        )

        Text(
            text = "[ LOAD... AWAITING ENGAGEMENT ]",
            style = MaterialTheme.typography.labelLarge.copy(
                color = BrandWhite.copy(alpha = 0.5f),
                letterSpacing = 4.sp
            ),
            modifier = Modifier.align(Alignment.TopEnd).padding(32.dp)
        )

        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(32.dp),
            verticalArrangement = Arrangement.Center
        ) {
            Text(
                text = "[02] PLATE CALCULATOR",
                style = MaterialTheme.typography.labelLarge.copy(
                    color = BrandRed,
                    fontSize = 24.sp,
                    letterSpacing = 2.sp
                ),
                modifier = Modifier.padding(bottom = 16.dp)
            )
            
            Text(
                text = "MATHEMATICAL\nPRECISION.",
                style = MaterialTheme.typography.displayMedium.copy(
                    color = BrandWhite,
                    fontSize = 60.sp,
                ),
                modifier = Modifier.padding(bottom = 32.dp)
            )

            Box(
                modifier = Modifier
                    .background(BrandWhite)
                    .border(4.dp, BrandRed)
                    .padding(24.dp)
                    .graphicsLayer {
                        shadowElevation = 16f
                        ambientShadowColor = BrandRed
                        spotShadowColor = BrandRed
                    }
            ) {
                Text(
                    text = "NEVER MISCALCULATE YOUR LOAD. TAP TO ENGAGE.",
                    style = MaterialTheme.typography.bodyLarge.copy(
                        color = BrandBlack,
                        fontSize = 20.sp
                    )
                )
            }
            
            // Barbell UI
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(200.dp)
                    .padding(top = 48.dp),
                contentAlignment = Alignment.Center
            ) {
                // The Steel Bar
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(24.dp)
                        .background(Color.Gray)
                        .border(2.dp, BrandBlack)
                )
                
                // Plates Assembly (Left)
                Row(
                    modifier = Modifier
                        .align(Alignment.CenterStart)
                        .padding(start = 32.dp)
                        .graphicsLayer { translationX = -platesOffset },
                    horizontalArrangement = Arrangement.spacedBy(4.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(modifier = Modifier.width(32.dp).height(120.dp).background(BrandBlack).border(2.dp, Color.Gray), contentAlignment = Alignment.Center) {
                        Text("45", color = Color.Gray, fontSize = 12.sp, fontWeight = FontWeight.Black)
                    }
                    Box(modifier = Modifier.width(24.dp).height(90.dp).background(BrandBlack).border(2.dp, Color.Gray), contentAlignment = Alignment.Center) {
                        Text("25", color = Color.Gray, fontSize = 10.sp, fontWeight = FontWeight.Black)
                    }
                }

                // Plates Assembly (Right)
                Row(
                    modifier = Modifier
                        .align(Alignment.CenterEnd)
                        .padding(end = 32.dp)
                        .graphicsLayer { translationX = platesOffset },
                    horizontalArrangement = Arrangement.spacedBy(4.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(modifier = Modifier.width(24.dp).height(90.dp).background(BrandBlack).border(2.dp, Color.Gray), contentAlignment = Alignment.Center) {
                        Text("25", color = Color.Gray, fontSize = 10.sp, fontWeight = FontWeight.Black)
                    }
                    Box(modifier = Modifier.width(32.dp).height(120.dp).background(BrandBlack).border(2.dp, Color.Gray), contentAlignment = Alignment.Center) {
                        Text("45", color = Color.Gray, fontSize = 12.sp, fontWeight = FontWeight.Black)
                    }
                }
            }
        }
    }
}

@Composable
fun BarVelocityPanel(width: androidx.compose.ui.unit.Dp, height: androidx.compose.ui.unit.Dp) {
    Box(
        modifier = Modifier
            .width(width)
            .height(height)
            .background(BrandGray) // slightly different dark background
    ) {
        Text(
            text = "[ CRITICAL ALERT ]",
            style = MaterialTheme.typography.labelLarge.copy(
                color = BrandRed,
                letterSpacing = 4.sp,
                fontWeight = FontWeight.Black
            ),
            modifier = Modifier.align(Alignment.TopEnd).padding(32.dp)
        )

        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(32.dp),
            verticalArrangement = Arrangement.Center
        ) {
            Text(
                text = "[03] BAR VELOCITY",
                style = MaterialTheme.typography.labelLarge.copy(
                    color = BrandRed,
                    fontSize = 24.sp,
                    letterSpacing = 2.sp
                ),
                modifier = Modifier.padding(bottom = 16.dp)
            )
            
            Text(
                text = "BAR SPEED DROPPING.\nCNS FATIGUE EMINENT.",
                style = MaterialTheme.typography.displayMedium.copy(
                    color = BrandWhite,
                    fontSize = 60.sp,
                ),
                modifier = Modifier.padding(bottom = 32.dp)
            )

            Box(
                modifier = Modifier
                    .background(BrandRed)
                    .border(4.dp, BrandWhite)
                    .padding(24.dp)
                    .graphicsLayer {
                        shadowElevation = 16f
                        ambientShadowColor = BrandWhite
                        spotShadowColor = BrandWhite
                    }
            ) {
                Text(
                    text = "TERMINATE SET.",
                    style = MaterialTheme.typography.bodyLarge.copy(
                        color = BrandWhite,
                        fontSize = 24.sp,
                        fontWeight = FontWeight.Black
                    )
                )
            }
        }
    }
}

@Composable
fun FooterSection(scrollState: LazyListState, index: Int) {
    val configuration = LocalConfiguration.current
    val screenHeight = configuration.screenHeightDp.dp
    
    val scrollOffset by remember {
        derivedStateOf {
            if (scrollState.firstVisibleItemIndex == index) {
                scrollState.firstVisibleItemScrollOffset.toFloat()
            } else 0f
        }
    }

    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(screenHeight)
            .background(BrandRed),
        contentAlignment = Alignment.Center
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = "NO MORE EXCUSES.\nCOMMENCE PROTOCOL.",
                style = MaterialTheme.typography.displayLarge.copy(
                    color = BrandBlack,
                    fontWeight = FontWeight.Black,
                    fontSize = (configuration.screenWidthDp / 6.5).sp,
                    letterSpacing = (-2).sp,
                    textAlign = TextAlign.Center
                ),
                modifier = Modifier
                    .graphicsLayer {
                        val scale = 1f + (scrollOffset * 0.001f)
                        scaleX = scale
                        scaleY = scale
                    }
                    .padding(bottom = 64.dp)
            )

            BrutalistButton(text = "[ INITIATE THE VAULT ]", onClick = {})
        }
    }
}
