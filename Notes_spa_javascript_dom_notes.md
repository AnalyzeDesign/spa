## When modifying html in DOM on the page with JavaScript, think about
1. Call Stack
2. Event Queue (not executing in line by line)
3. DOM

# How JS executes

Top-to-bottom, at first.

$ tells JS to execute anonymous function after page loads...
- This gets added to Event Queue

Once loaded, event fires

$.get will request to tasks, will return immediately, not wait for other processes

attach success methods.

Will put success method on event queue.

Eventually, http returns with successful response

Now, will continue down code.
