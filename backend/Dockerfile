FROM python:3.7.9-buster

LABEL authors="Bohdan"

WORKDIR /usr/src/app

COPY . .

RUN groupadd -r user && useradd -r -g user osirius
RUN mkdir /home/osirius && chown osirius:user -R /home/osirius && chmod 777 -R /usr/src/app

USER osirius

RUN pip install --no-cache -r requirements.txt

RUN export PYTHONPATH=$PYTHONPATH:$WORKDIR:/home/osirius/.local/bin

EXPOSE 3000


WORKDIR /usr/src/app

ENTRYPOINT [ "python" ]

CMD ["manage.py", "runserver", "0.0.0.0:8000"]