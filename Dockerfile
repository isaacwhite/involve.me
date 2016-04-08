# Use the default Python image
FROM python:2.7

ENV PYTHONUNBUFFERED 1


# Add our app
RUN mkdir /code
WORKDIR /code
ADD . /code/
RUN mkdir -p /code/static

# Install our Python requirements
RUN pip install --upgrade pip
RUN pip install -r requirements.txt