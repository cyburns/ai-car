const canvas = document.getElementById('carCanvas');
canvas.window = 200;

const carCtx = canvas.getContext('2d');
const road = new Road(canvas.width / 2, canvas.width * 0.9);

const N = 100;
const cars = generateCars(N);
let bestCar = cars[0];

if (localStorage.getItem("bestBrain")) {
    for (let i = 0; i < cars.length; i++) {
        cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));

        if (i !== 0) {
            NeuralNetwork.mutate(cars[i].brain, 0.1);
        }

    }
}

const traffic = [
    new Car(road.getLaneCenter(2), 600, 30, 50, "NPC", 3),

    new Car(road.getLaneCenter(1), 400, 30, 50, "NPC", 3),
    new Car(road.getLaneCenter(3), 400, 30, 50, "NPC", 3),

    new Car(road.getLaneCenter(0), 200, 30, 50, "NPC", 3),
    new Car(road.getLaneCenter(2), 200, 30, 50, "NPC", 3),

    new Car(road.getLaneCenter(2), 0, 30, 50, "NPC", 3),
    new Car(road.getLaneCenter(4), 0, 30, 50, "NPC", 3),

    new Car(road.getLaneCenter(1), -200, 30, 50, "NPC", 3),
    new Car(road.getLaneCenter(2), -200, 30, 50, "NPC", 3),

    new Car(road.getLaneCenter(0), -400, 30, 50, "NPC", 3),
    new Car(road.getLaneCenter(3), -400, 30, 50, "NPC", 3),

    new Car(road.getLaneCenter(3), -600, 30, 50, "NPC", 3),
    new Car(road.getLaneCenter(4), -600, 30, 50, "NPC", 3),

    new Car(road.getLaneCenter(0), -800, 30, 50, "NPC", 3),
    new Car(road.getLaneCenter(1), -800, 30, 50, "NPC", 3),
];

animate();

function save() {
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
}

function discard() {
    localStorage.removeItem("bestBrain");
}

function generateCars(N) {
    const cars = [];

    for (let i = 1; i <= N; i++) {
        cars.push(new Car(road.getLaneCenter(2), 800, 30, 50, "AI"));
    }

    return cars;
}

function animate() {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }

    for (let i = 0; i < cars.length; i++) {
        cars[i].update(road.borders, traffic);
    }

    bestCar = cars
        .find((c) => c.y === Math.min(...cars
        .map((c) => c.y)));

    canvas.height = window.innerHeight;
    
    carCtx.save();
    carCtx.translate(0, -bestCar.y + canvas.height * 0.7);
    
    road.draw(carCtx);

    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carCtx, "green");
    }

    carCtx.globalAlpha = 0.2;

    for (let i = 0; i < cars.length; i++) {
        cars[i].draw(carCtx, "blue");
    }

    carCtx.globalAlpha = 1;
    bestCar.draw(carCtx, "blue", true);
    
    carCtx.restore();
    requestAnimationFrame(animate);
}

