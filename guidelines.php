<html>
    <head>
	<?php include "head.php" ?>
	<title>Guidelines</title>
    </head>
    <body>
	<header>
	    <?php include "menu.php" ?>
	    <h1>Guidelines</h1>
	    <h2>do not stray from the path</h2>
	</header>
	<article>
	    <h2>The other list</h2>
	    <ul>
		<li>Formatting your Projects
		    <ul>Include in your projects folder:
		        <li>index.html/php to provide as the link from the page</li>
		        <li>thumbnail.png to show as the thumbnail</li>
		        <li>a description.txt file to have a short description of the game</li>
		    </ul>
		</li>
		<li>For sites on the main directory: <br>Put everything in the article tag, & don't forget to include the php stuff</li>
		<li>For the git repository: <br>Only commit to dev, we'll merge to master when dev is deemed stable</li>
	    </ul>
	    <ol>
		To Get the Git Repository:
		<li>get a connection to the server over ssh (or however else will work)</li>
		<li>navigate to the folder where the repository folder will be placed "cd dir"</li>
		<li>run: "git clone username@hostname:/var/www"</li>
	    </ol>
	</article>
	<?php include "footer.php" ?>
    </body>
</html>