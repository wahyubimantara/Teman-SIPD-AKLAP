const broadcastChannels = (function() {
    var channels = {};
    return  {
        getChannel: function(channel) {
            if(channels[channel] === undefined) {
                channels[channel] = new BroadcastChannel(channel);
            }

            return channels[channel];
        },
    }
})();

console.log(broadcastChannels);

export default broadcastChannels;
