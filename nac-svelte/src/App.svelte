<script>
    let count = 0;
    let value = 1;
    function onClick() {
        count += parseInt(value);
    }
</script>

<div>
    <input type="text" bind:value={value} />

    <p>Count: {count}</p>

    <button on:click={onClick}>Click me</button>
</div>