# ai.js

## Requirements 
1. Should be easy to abstract - either do it on FE(via WebWorkers) or add API 


### k-nearest-neighbor
###What is it good for?

###Notes
1. Structure
    NodeList
        this.nodes = [Node]; 

Q&A:
    How do we Normalizing Features? x=1-9 & y=250-1700 Note: Axis have diffrent scales 
    Answer: 
        So instead of looking at absolute values of number of rooms and area, we should normalize these values to be between 0 and 1. After normalization, the lowest number of rooms (1) becomes 0, and the largest number of rooms (10) becomes 1. Similarly, the smallest area (250) becomes 0 and the largest area (1700) becomes 1. That puts everything on the same playing field and will adjust for discrepancies of scale. It's a simple thing to do that makes all the difference in the world.
        [Source](http://burakkanber.com/blog/machine-learning-in-js-k-nearest-neighbor-part-1/)

    What is "weighting"?
    Answer: 
        Pro-tip: you don't need to scale things evenly (into a square) like I described above. If area is more important to the problem than the number of rooms, you can scale those two features differently -- this is called "weighting", and gives more importance to one feature or another.
        [Source](http://burakkanber.com/blog/machine-learning-in-js-k-nearest-neighbor-part-1/)
    
