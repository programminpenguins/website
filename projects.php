<html>
    <head>
	<?php include "head.php" ?>
	<title>Projects</title>
    </head>
    <body>
	<header>
	    <?php include "menu.php" ?>
	    <h1>Projects</h1>
	    <h2>The fancy pants work we've all been doing</h2>
	</header>
	<p> We have a project on this very page! to implement an example of user meta, look what we know about you!</p>
	<div id="userCreep"></div>
	<article>
	    <?php
	    
	    $dir = getcwd() . "/projects";
	    $projects = scandir($dir);
	    $projects = array_slice($projects, 3);
	    for ($p = 0; $p < count($projects); $p++) {
		$projectDir = $dir . "/" . $projects[$p];
		echo "\n<div class=\"project\">\n";
		echo "<a href=\"projects/" . $projects[$p] . "\"><h3>" . $projects[$p] . "</h3></a>\n";
		echo "<a href=\"projects/" . $projects[$p] . "\"><img src=\"projects/" . $projects[$p] . "/thumbnail.png\" height=\"128\" width=\"128\" /></a>\n";
		include "projects/" . $projects[$p] . "/info.txt";
		echo "\n</div>\n";
	    }
	    
	    ?>
	</article>
    	<?php include "footer.php" ?>
    	<script type="text/javascript">
    	document.getElementById('userCreep').innerHTML ="You are visiting us on a system running " + navigator.platform + " and using the app" + window.navigator.appName;

    	</script>
    </body>
</html>