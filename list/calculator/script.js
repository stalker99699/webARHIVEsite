// Переключение темы
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
});

// Переключение типов калькуляторов
const calcType = document.getElementById('calc-type');
calcType.addEventListener('change', (e) => {
    document.querySelectorAll('.calc-section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(e.target.value).classList.add('active');
});

// ================== СТАНДАРТНЫЙ КАЛЬКУЛЯТОР ==================
let display = document.getElementById('display');
function appendToDisplay(value) {
    display.value += value;
}
function clearDisplay() {
    display.value = '';
}
function calculate() {
    try {
        display.value = math.evaluate(display.value);
    } catch (e) {
        display.value = 'Ошибка';
    }
}

// ================== КАЛЬКУЛЯТОР ПРОГРАММИСТА ==================
let progDisplay = document.getElementById('prog-display');
let progOpStack = [];
let currentBase = 10;

document.getElementById('base').addEventListener('change', (e) => {
    currentBase = parseInt(e.target.value);
});

function progAppend(value) {
    if ((currentBase === 2 && '23456789ABCDEF'.includes(value)) ||
        (currentBase === 8 && '89ABCDEF'.includes(value)) ||
        (currentBase === 10 && 'ABCDEF'.includes(value))) return;
    progDisplay.value += value;
}

function progOp(op) {
    progOpStack.push(parseInt(progDisplay.value || '0', currentBase));
    progOpStack.push(op);
    progDisplay.value = '';
}

function progClear() {
    progDisplay.value = '';
    progOpStack = [];
}

function progCalculate() {
    progOpStack.push(parseInt(progDisplay.value || '0', currentBase));
    let result = progOpStack[0];
    for (let i = 1; i < progOpStack.length; i += 2) {
        const op = progOpStack[i];
        const next = progOpStack[i + 1];
        if (op === 'AND') result &= next;
        else if (op === 'OR') result |= next;
        else if (op === 'XOR') result ^= next;
        else if (op === '<<') result <<= next;
        else if (op === '>>') result >>= next;
    }
    progDisplay.value = result.toString(currentBase).toUpperCase();
    progOpStack = [];
}

// ================== ФИНАНСОВЫЙ КАЛЬКУЛЯТОР ==================
function calcCompound() {
    const amount = parseFloat(document.getElementById('fin-amount').value);
    const rate = parseFloat(document.getElementById('fin-rate').value) / 100;
    const period = parseFloat(document.getElementById('fin-period').value);
    const result = amount * Math.pow(1 + rate, period);
    document.getElementById('fin-result').value = result.toFixed(2);
}

// ================== ГРАФИЧЕСКИЙ 2D ==================
let chart2D;
function plot2D() {
    const func = document.getElementById('function-2d').value;
    const data = [];
    for (let x = -10; x <= 10; x += 0.1) {
        try {
            const y = math.evaluate(func.replace(/x/g, x));
            data.push({ x, y });
        } catch {}
    }
    const ctx = document.getElementById('graph-2d-canvas').getContext('2d');
    if (chart2D) chart2D.destroy();
    chart2D = new Chart(ctx, {
        type: 'line',
        data: { datasets: [{ label: func, data, borderColor: 'rgb(75, 192, 192)', fill: false }] },
        options: { scales: { x: { type: 'linear' }, y: { type: 'linear' } } }
    });
}

// ================== ГРАФИЧЕСКИЙ 3D ==================
let scene, camera, renderer, mesh;
function plot3D() {
    const func = document.getElementById('function-3d').value;
    const container = document.getElementById('graph-3d-container');
    container.innerHTML = '';
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / 300, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, 300);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(20, 20, 50, 50);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.z = 20;

    // Анимация и рендер
    function animate() {
        requestAnimationFrame(animate);
        const positions = geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];
            try {
                positions[i + 2] = math.evaluate(func.replace(/x/g, x).replace(/y/g, y));
            } catch {}
        }
        geometry.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
    }
    animate();
}

// ================== НАУЧНЫЙ КАЛЬКУЛЯТОР ==================
let sciDisplay = document.getElementById('sci-display');
function sciAppend(value) {
    sciDisplay.value += value;
}
function sciClear() {
    sciDisplay.value = '';
}
function sciCalculate() {
    try {
        sciDisplay.value = math.evaluate(sciDisplay.value);
    } catch (e) {
        sciDisplay.value = 'Ошибка';
    }
}
