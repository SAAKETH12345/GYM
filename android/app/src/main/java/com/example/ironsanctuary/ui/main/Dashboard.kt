package com.example.ironsanctuary.ui.main

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ironsanctuary.theme.BrandBlack
import com.example.ironsanctuary.theme.BrandRed
import com.example.ironsanctuary.theme.BrandWhite

@Composable
fun OperativeVaultDashboard() {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(BrandBlack)
            .padding(16.dp)
    ) {
        item {
            Text(
                text = "OPERATIVE\nVAULT",
                style = MaterialTheme.typography.displayLarge.copy(
                    color = BrandWhite,
                    fontSize = 72.sp,
                    letterSpacing = (-4).sp,
                    lineHeight = 72.sp
                ),
                modifier = Modifier.padding(top = 32.dp, bottom = 48.dp)
            )
        }
        
        item {
            TelemetryStatCard(
                title = "MAX DEADLIFT",
                value = "405 LBS",
                subLabel = "+20 LBS FROM PREV CYCLE"
            )
            TelemetryStatCard(
                title = "TOTAL VOLUME",
                value = "12.4 K",
                subLabel = "+1.2 K THIS WEEK"
            )
            TelemetryStatCard(
                title = "CNS FATIGUE",
                value = "LOW",
                subLabel = "OPTIMAL FOR HEAVY LOADS"
            )
            Spacer(modifier = Modifier.height(48.dp))
        }

        item {
            BrutalistTextButton(text = "[ INIT SANCTUARY AI ]", onClick = { /* TODO */ })
            Spacer(modifier = Modifier.height(16.dp))
            BrutalistTextButton(text = "[ TERMINATE SESSION ]", onClick = { /* TODO */ })
        }
    }
}

@Composable
fun BrutalistTextButton(text: String, onClick: () -> Unit) {
    val interactionSource = remember { MutableInteractionSource() }
    Text(
        text = text,
        style = MaterialTheme.typography.labelLarge.copy(
            color = BrandRed,
            fontSize = 18.sp,
            fontWeight = FontWeight.Black,
            letterSpacing = 2.sp
        ),
        modifier = Modifier
            .clickable(
                interactionSource = interactionSource,
                indication = null,
                onClick = onClick
            )
            .padding(vertical = 8.dp)
    )
}

@Composable
fun TelemetryStatCard(title: String, value: String, subLabel: String) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp)
            .background(BrandBlack)
            .border(1.dp, BrandRed, RectangleShape)
            .padding(24.dp)
    ) {
        Column {
            Text(
                text = title,
                style = MaterialTheme.typography.labelLarge.copy(
                    color = BrandWhite,
                    letterSpacing = 2.sp
                )
            )
            Text(
                text = value,
                style = MaterialTheme.typography.displayLarge.copy(
                    color = BrandWhite,
                    fontSize = 56.sp,
                    fontWeight = FontWeight.Black,
                    letterSpacing = (-2).sp
                ),
                modifier = Modifier.padding(vertical = 8.dp)
            )
            Text(
                text = subLabel,
                style = MaterialTheme.typography.labelSmall.copy(
                    color = BrandRed,
                    fontWeight = FontWeight.Black,
                    letterSpacing = 1.sp
                )
            )
        }
    }
}

