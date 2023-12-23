# Reading and writing large CSV files in Node.js can be efficiently handled using streams. Streams allow you to process data in chunks, which is crucial for handling large files without consuming excessive memory.

#### This takes in an input.csv and adds 1 to the age column (for an example) and creates the output.csv file

###### To run: 1. npm install 2. node index.js

### Streams in Node.js provide a mechanism to efficiently process data in chunks, rather than loading the entire dataset into memory.

### Parallel processing with streams in Node.js involves creating multiple streams that operate simultaneously, allowing for more efficient data processing.

#### Let's say you have a large CSV file with user data, and you want to perform two parallel tasks: one to filter users older than 22 and another to filter users from a specific city (New york for this example). The file parallelprocessing.js will produce 2 csv files: users_over_22.csv and users_in_ny.csv

###### 1. npm install 2. node parallelprocessing.js

### Streams offer several optimizations:

Memory Efficiency:

''' Streams allow you to process data in smaller, manageable chunks. This is particularly useful for handling large files or streams of data without consuming excessive memory.
In scenarios where the entire dataset may not fit into memory, using streams prevents out-of-memory errors. '''

Time Efficiency:

Data processing can begin as soon as the first chunk is available, rather than waiting for the entire dataset to be read. This reduces the overall processing time.
Streaming is particularly advantageous for scenarios where real-time or near-real-time processing is required.
Parallel Processing:

Streams can be easily piped and connected, enabling parallel processing of data through multiple transformations or operations.
This parallelism can lead to faster data processing, especially when dealing with CPU-intensive or I/O-bound tasks.
Network Efficiency:

When dealing with network communication, streams can be used to efficiently send and receive data in smaller packets, reducing latency and improving performance.
Backpressure Handling:

Streams provide a built-in mechanism for handling backpressure. When a destination cannot process data as fast as it's being produced, the source stream can be instructed to slow down or pause, preventing overwhelming the system.
Here's a high-level workflow of how streams operate:

Readable Stream:

Creation: Initialize a readable stream from a data source (e.g., a file, an HTTP request, or a database query).
Reading: Data is read from the source in manageable chunks, triggering the 'data' event for each chunk.
Transform Stream (Optional):

Creation: If needed, a transform stream can be used to modify or process the data in-flight.
Transformation: Data passes through the transform stream, where it can be modified before being passed to the next stream or destination.
Writable Stream:

Creation: Initialize a writable stream, which could be a file, an HTTP response, or any other destination for the processed data.
Writing: Processed data is written to the destination in chunks, triggering the 'data' event for each chunk.
Event Handling:

Events like 'end' and 'error' signify the completion or any errors during the process.
By breaking down data processing into smaller, manageable chunks and allowing these chunks to flow through a pipeline, streams provide a flexible and efficient way to handle data in Node.js applications.
