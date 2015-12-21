#!/bin/bash

function gen_icon() {
	in=$1
	out=$2
	convert $in -fill black  -pointsize 100 -weight bold -annotate +62+132 'E' $out
}

gen_icon "search-256.png" "out.png"

convert "out.png" -resize 48x48 "icon-48.png"
convert "out.png" -resize 128x128 "icon-128.png"
