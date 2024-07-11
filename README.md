# Machine Learning, Neural Network Self-Driving Car

Instructions read:

Saving the Furthest Car Data.

As the cars navigate through the environment, monitor which car travels the furthest distance.
When a car achieves the longest travel distance, save its data to the "brain" of the system. This "brain" could be a neural network or a genetic algorithm model that stores the car's parameters, strategies, and decisions that led to its successful journey.
This process allows the system to learn from the most successful cars and apply that knowledge to future generations, improving their performance over time.
Handling Crashed or Idle Cars:

Continuously observe the status of all the cars in the simulation.
When all cars have either:
Crashed into obstacles or other cars, or
Become idle (stopped moving) in front of an NPC (non-player character) car,
It is time to reset the simulation for a new iteration.

Reloading the Page:

Once all cars are either crashed or idle, reload the page to reset the environment and start a new session.
This refreshes the simulation, allowing the newly "trained" cars (those with the saved "brain" data from the furthest car) to be tested and further improved.
Iterative Learning Process:

Repeat the process of saving the furthest car's data and reloading the page after all cars are stalled or crashed.
Each iteration uses the previously saved best-performing data to enhance the cars' capabilities.
Over multiple iterations, this method should result in cars that can navigate further and more efficiently, adapting to the challenges presented by the environment.
By following these steps, you ensure a systematic approach to enhancing the cars' performance through continuous learning and iteration.

I hope you enjoy vanilla!
