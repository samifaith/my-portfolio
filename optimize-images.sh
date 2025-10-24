#!/bin/bash

# Image Optimization Script for Portfolio
# This script converts PNG images to WebP format for better performance

echo "🖼️  Starting image optimization..."

# Check if imagemagick or sharp-cli is installed
if ! command -v convert &> /dev/null && ! command -v npx &> /dev/null; then
    echo "⚠️  ImageMagick or sharp-cli not found."
    echo "Install ImageMagick: brew install imagemagick"
    echo "Or use sharp-cli via npx (included in script)"
    exit 1
fi

# Function to optimize image using sharp (if available)
optimize_with_sharp() {
    local input=$1
    local output=$2
    local quality=${3:-80}
    
    npx @squoosh/cli --webp "{\"quality\":$quality}" -d "$(dirname "$output")" "$input" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        return 0
    else
        return 1
    fi
}

# Function to optimize image using ImageMagick
optimize_with_imagemagick() {
    local input=$1
    local output=$2
    local quality=${3:-80}
    
    convert "$input" -quality $quality -define webp:method=6 "$output"
    return $?
}

# Optimize headshot (critical LCP image)
echo "Optimizing headshot.png..."
if [ -f "src/headshot.png" ]; then
    # Try sharp first, fall back to ImageMagick
    if ! optimize_with_sharp "src/headshot.png" "public/headshot.webp" 85; then
        if command -v convert &> /dev/null; then
            optimize_with_imagemagick "src/headshot.png" "public/headshot.webp" 85
            echo "✅ Created public/headshot.webp using ImageMagick"
        else
            echo "❌ Could not optimize headshot. Install ImageMagick or use online converter"
            echo "   Recommended: https://squoosh.app/"
        fi
    else
        echo "✅ Created public/headshot.webp using sharp"
    fi
    
    # Get file sizes for comparison
    original_size=$(du -h src/headshot.png | cut -f1)
    if [ -f "public/headshot.webp" ]; then
        webp_size=$(du -h public/headshot.webp | cut -f1)
        echo "   Original: $original_size → WebP: $webp_size"
    fi
else
    echo "❌ src/headshot.png not found"
fi

echo ""
echo "📊 Optimization complete!"
echo ""
echo "Next steps:"
echo "1. Update AnimatedHomePage.js to use WebP with PNG fallback"
echo "2. Run: npm run build"
echo "3. Test with Lighthouse"
