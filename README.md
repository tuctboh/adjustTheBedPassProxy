#####################################################################
################## AWS LAMBDA STARTER PROJECT #######################
#####################################################################

Introduction
---------------

These instructions will guide you through the process of setting up
and configuring an account on AWS. Once you reach the end of the 
guide you should have launched your very own lambda function that
will you will use to request data from another server and return this
data back to you.

Prerequisites
-------------
In order to complete this exercise you will need to install some 
software on your computer and sign up to use AWS services.

Software required:

* python (Python 2 version 2.6.5+ or Python 3 version 3.3+)
* pip (python package manager)
* awscli

Installing Python
-----------------

If you do not already have python installed, you will need to install
it.

Windows users are recommended to visit:

https://www.python.org/downloads/

and select an executable installer that you can download and run.

Once the installer is complete you should be able to open a cmd
shell and run:

C:\>python

The installer should ensure your environment variables are configured
correctly but should you run into any issues please visit:

https://docs.python.org/3/using/windows.html and ensure python is 
in your path.

Unix users should use your system package manager (apt, yum etc)

e.g.

APT (Debian flavours / Ubuntu)
$ sudo apt-get update
$ sudo apt-get install python3.7

YUM (Centos / RedHat / Amazon Linux)
$ sudo yum update
$ sudo yum install python3

Mac users can either download the macos installer from python.org
or use if you are using the brew package manager you can install
python using brew:

$ brew install python

Once you have python installed you will need to install pip:

Debian / Ubuntu

$ sudo apt install python3-pip

Centos / RedHat / Amazon Linux

$ sudo yum install python-pip

MacOS / Windows (and alternative for all OS)

download: https://bootstrap.pypa.io/get-pip.py

using cmd or terminal navigate to the location of the file you have
just downloaded and execute the following:

$ python3 get-pip.py
(you may need to replace python3 command with python)

To upgrade an existing setuptools (or distribute), run:

$ pip install -U setuptools

Installing AWS CLI
------------------

Once you have python and pip installed you are ready to install the
aws cli:

$ pip3 install awscli --upgrade --user
(you may need to replace pip3 command with pip)

Check aws cli installed:

$ aws --version
(aws-cli/1.16.71 Python/3.6.5 Linux/4.14.77-81.59-amzn2.x86_64 botocore/1.12.61)

For more information see: 
https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html

Creating and Configure AWS account
----------------------------------

Now you have all the prerequisite software installed you need to 
create an account on aws:

https://aws.amazon.com/free/

You will need to complete a more setup steps with the AWS dashboard
to continue.

Best practices dictate that you don't use your root account for 
general operation and usage of AWS. So you need to use IAM to create
a new user for yourself.

Navigate to: https://console.aws.amazon.com/iam/home

On the left navigation pane, select users and then hit the blue 
'Add user' button. Complete the required details. For access type you
should select both: Programmatic and AWS Management Console.

Next you will need to give your user some permissions. In this
instance, choose the third option: Attach existing policies directly
and select the first Policy in the list: AdministratorAccess.
Click next and skip any further options. Once you reach the success
screen you should be presented with Access Key ID and Secret Access 
Key which you should copy.

Next return to your terminal or cmd shell and execute:

$ aws configure

Complete the Access Key Id, Secret Access Key with the values you 
have just obtained from IAM. Select a default region, see:

https://docs.aws.amazon.com/general/latest/gr/rande.html for 
available regions.

Default output format can be: json or table or text. This is your 
choice.

You should now be able to use the aws cli to create a bucket in S3.

$ aws s3 mb s3://your-bucket-name
(replace your-bucket-name with a unique name personal to you)
$ aws s3 ls
(your new bucket should be listed)

Launch Your lambda
------------------

Next use terminal or cmd shell and navigate to the Project folder.

Run the following command:

$ aws cloudformation package --template-file template.yaml --output-template-file deploy.yaml --s3-bucket your-bucket-name

(your-bucket-name should be replaced with the name of the bucket you created earlier)

You should now have a new file called deploy.yaml in the Project folder.

Next run:

$ aws cloudformation deploy --template-file deploy.yaml --capabilities CAPABILITY_NAMED_IAM --stack-name TheBedPassProxy --parameter-overrides email=enter@youremail.com password=enter-your-password secret=enter-a-secret

You should replace your own values for email, password and secret.

Visit https://eu-west-1.console.aws.amazon.com/cloudformation/

Make sure the region selected (in the top right) is the same as the 
default region you selected when you ran `aws configure` 

You should see your stack `TheBedPassProxy` being created. Once it is 
created, click the 'Outputs' tab and you should see a value for
url.

Paste this url in your browser and append your secret to make a
request to your lambda and receive the proxied http request.

