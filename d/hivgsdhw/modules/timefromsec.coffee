exports.timeFromSeconds = (seconds) ->
	if seconds > 0
		return new Date(seconds * 1000).toISOString().substr(15, 4)
	else
		return "0:00"