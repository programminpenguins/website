<html>
    <head>
	<?php include "head.php" ?>
	<title>Programming Penguins</title>
    </head>
    <body>
	<header>
	    <?php include "menu.php" ?>
	    <h1>Programmin Penguins</h1>
	    <h2>0b100101011010011010010101101011101101001</h2>
	</header>
	<article>
	    <h2>Featured</h2>
	    <p>for now, let's try and keep an organized project system for showing it on our site. 
	    Have inside your project folder:
		<ul>
		    <li>index.html/php to provide as the link from this page</li>
		    <li>thumbnail.png to show as the thumbnail</li>
		    <li>a description.txt file to have a short description of the game</li>
		</ul>
	    this will be loaded on to the homepage and /projects automatically.
	    for now, this project that I've provided will be the example:
	    </p>
	    <table>
		<tr>
		    <?php
		    
		    $dir = getcwd() . "/projects";
		    $projects = scandir($dir);
		    $projects = array_slice($projects, 2);
		    for ($p = 0; $p < count($projects); $p++) {
			$projectDir = $dir . "/" . $projects[$p];
			echo "\n<td class=\"project\">\n";
			echo "<a href=\"projects/" . $projects[$p] . "\"><h3>" . $projects[$p] . "</h3></a>\n";
			echo "<a href=\"projects/" . $projects[$p] . "\"><img src=\"projects/" . $projects[$p] . "/thumbnail.png\" height=\"128\" width=\"128\" /></a>\n";
			include "projects/" . $projects[$p] . "/info.txt";
			echo "\n</td>\n";
		    }
		    
		    ?>
		</tr>
	    </table>
	    <h2>Git Repository</h2>
	    <p>Contact us personally to get information for accessing the git repository we have on the site so you can edit it yourself and help us out.</p>
	    <p>Also, please make sure that you create a local branch on your computer that tracks origin/dev, commit to this, not master.</p>
	    <h2>About Us</h2>
	    <p>We're some people, who do some pretty cool stuff.</p>
	    <p>Oh, and just in case you were wondering. Yes, the font is <del>Ubuntu</del> Roboto.</p>
	</article>
	<?php include "footer.php" ?>
    </body>
</html>
