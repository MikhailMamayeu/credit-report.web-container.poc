DOMAIN := credit-report
NAME := web-container.poc
VERSION := $(shell git rev-parse HEAD)
ROOT_DIR := $(dir $(CURDIR))
AWS_ACCOUNT := 029718257588
BASE_NAME := $(DOMAIN).$(NAME).$(VERSION)
IMAGE := $(BASE_NAME).image
CONTAINER := $(BASE_NAME).container
TAR_FILESYSTEM := $(BASE_NAME).tar

image: # Build Docker image to generate Webpack assets
image:
	docker build -t $(IMAGE) -f $(ROOT_DIR)Dockerfile.s3 $(ROOT_DIR)

build: # Generate Webpack assets in Docker container
build:
	docker run --name $(CONTAINER) $(IMAGE)

filesystem: # Extract filesystem from Docker container
filesystem:
	docker export $(CONTAINER) > $(ROOT_DIR)$(TAR_FILESYSTEM)

extract: # Extract Webpack assets from Docker filesystem
extract:
	tar --strip-components=3 -xf $(ROOT_DIR)$(TAR_FILESYSTEM) -C $(ROOT_DIR) usr/src/app/dist

deploy: # Deploy assets to S3
deploy:
	/bin/bash -c ". aws-assume-role $(AWS_ACCOUNT) && aws s3 sync $(ROOT_DIR)/dist/ s3://ctm-fcr-web-poc --region eu-west-1"

clean: # Cleanup
clean:
	docker rm $(CONTAINER)
	docker image rm $(IMAGE)
	rm -f $(ROOT_DIR)$(TAR_FILESYSTEM)
	rm -rf $(ROOT_DIR)dist
