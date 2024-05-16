document.addEventListener("DOMContentLoaded", function() {
    // Sample dataset
    const data = [
        [2000, 2100, 2200, 2300, 2400],
        [10000, 11000, 12000, 13000, 14000],
        [45000, 46000, 47000, 48000, 49000],
        [55000, 56000, 57000, 58000, 59000],
        [60000, 61000, 62000, 63000, 64000]
    ];

    const numRows = data.length;
    const numCols = data[0].length;
    const barWidth = 0.4;
    const barSpacing = 0.4;
    const maxVal = Math.max(...data.flat());

    const barchart = document.getElementById('barchart');
    const camera = document.getElementById('camera');
    let currentText = null;

    // Calculate the offset to center the bar chart
    const xOffset = (numCols * (barWidth + barSpacing)) / 2 - barSpacing / 2;
    const zOffset = (numRows * (barWidth + barSpacing)) / 2 - barSpacing / 2;

    data.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
            const height = value / maxVal * 3; // Normalize height for better visualization

            const bar = document.createElement('a-box');
            bar.setAttribute('width', barWidth);
            bar.setAttribute('depth', barWidth);
            bar.setAttribute('height', height);
            bar.setAttribute('color', `#${Math.floor(Math.random()*16777215).toString(16)}`);
            bar.setAttribute('position', `${colIndex * (barWidth + barSpacing) - xOffset} ${height / 2} ${-rowIndex * (barWidth + barSpacing) + zOffset}`);
            bar.setAttribute('material', 'opacity: 1; transparent: false;'); // Transparent filled color
            bar.setAttribute('shadow', 'cast: true; receive: false');

            // Add event listener for click event
            bar.addEventListener('click', () => {
                // Remove existing text element if present
                if (currentText) {
                    currentText.parentNode.removeChild(currentText);
                }
                
                // Create text entity for displaying value in front of camera
                const text = document.createElement('a-text');
                text.setAttribute('value', `GDP per capita: USD ${value}`);
                text.setAttribute('color', '#000000');
                text.setAttribute('align', 'center');
                text.setAttribute('position', '1 2 -3'); // Position text to be in front of the camera
                text.setAttribute('scale', '1 1 1'); // Set text scale
                text.setAttribute('visible', 'true'); // Ensure text is visible
                text.setAttribute('background', 'color: #000'); // Set text background color to black
                text.setAttribute('font', 'mozillavr'); // Change font
                text.setAttribute('font-weight', 'bold'); // Set font weight
                text.setAttribute('border-color', '#FFF'); // Set border color to white
                text.setAttribute('border-width', '0.1'); // Set border width
                text.setAttribute('border-opacity', '1'); // Set border opacity
                camera.appendChild(text); // Append text to the camera
                currentText = text;
            });

            // Add event listeners for interactivity
            bar.addEventListener('mouseenter', () => {
                // Change color and scale when hovering
                bar.setAttribute('color', 'orange');
                bar.setAttribute('scale', '1.2 1.2 1.2');
            });
            bar.addEventListener('mouseleave', () => {
                // Revert color and scale when leaving
                bar.setAttribute('color', `#${Math.floor(Math.random()*16777215).toString(16)}`);
                bar.setAttribute('scale', '1 1 1');
            });

            barchart.appendChild(bar);
        });
    });

    // Ground plane to receive shadows
    const ground = document.createElement('a-plane');
    ground.setAttribute('rotation', '-90 0 0');
    ground.setAttribute('width', '20');
    ground.setAttribute('height', '20');
    ground.setAttribute('color', '#7BC8A4');
    ground.setAttribute('shadow', 'receive: true');
    barchart.appendChild(ground);

    // Sky background
    const sky = document.createElement('a-sky');
    sky.setAttribute('color', '#ECECEC');
    barchart.appendChild(sky);
});
