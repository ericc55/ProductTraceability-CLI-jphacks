<script type="text/javascript">
let connected = false;
function connect() {
  connected = true;
}
function disconnect() {
  connected = false;
}
export default {
  connected,
  connect,
  disconnect,
};
</script>
